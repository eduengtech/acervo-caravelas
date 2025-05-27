import { SetMetadata } from '@nestjs/common';
import { Permissao } from '../../../generated/prisma';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Permissao[]) => SetMetadata(ROLES_KEY, roles);
