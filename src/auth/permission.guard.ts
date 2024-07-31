import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from './entities/user.entity'; // Adjust import as per your project structure
import { PERMISSIONS_KEY } from './permission.decorator';
import { AuthService } from './auth.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector, private authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredPermissions) {
            return true;
        }
        const { user }: { user: User } = context.switchToHttp().getRequest();
        if (!user) {
            throw new ForbiddenException('No user logged in');
        }
        const userPermissionsData = await this.authService.findUserById(user.id);
        return userPermissionsData.role.permissions.some((permission) => permission.name === requiredPermissions[0]);
    }
}
