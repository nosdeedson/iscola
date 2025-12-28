import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users Workers')
@Controller('users/workers')
export class UsersController {}
