import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Request } from "express";
import * as moment from "moment";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { ShareSecurityGuard } from "src/share/guard/shareSecurity.guard";
import { ShareService } from "src/share/share.service";
import { ConfigService } from "src/config/config.service";

@Injectable()
export class FileSecurityGuard extends ShareSecurityGuard {
  constructor(
    private _shareService: ShareService,
    private _prisma: PrismaService,
    _config: ConfigService,
  ) {
    super(_shareService, _prisma, _config);
  }

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const shareId = (Object.prototype.hasOwnProperty.call(
      request.params,
      "shareId",
    )
      ? request.params.shareId
      : request.params.id) as string;

    const shareToken = request.cookies[`share_${shareId}_token`];

    const share = await this._prisma.share.findUnique({
      where: { id: shareId },
      include: { security: true },
    });

    // If there is no share token the user requests a file directly
    if (!shareToken) {
      if (
        !share ||
        (moment().isAfter(share.expiration) &&
          !moment(share.expiration).isSame(0))
      ) {
        throw new NotFoundException("File not found");
      }

      type ShareWithSecurity = Prisma.ShareGetPayload<{
        include: { security: true };
      }>;
      const shareWithSecurity = share as ShareWithSecurity;

      if (shareWithSecurity.security?.password)
        throw new ForbiddenException("This share is password protected");

      if (shareWithSecurity.security?.maxViews && shareWithSecurity.security.maxViews <= shareWithSecurity.views) {
        throw new ForbiddenException(
          "Maximum views exceeded",
          "share_max_views_exceeded",
        );
      }

      await this._shareService.increaseViewCount(shareWithSecurity);
      return true;
    } else {
      return super.canActivate(context);
    }
  }
}
