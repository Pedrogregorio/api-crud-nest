import { HttpException, HttpStatus } from '@nestjs/common';

export class Verify {
  public presentAttributes(createUserDto) {
    const errors = [];
    const attributes = Object.keys(createUserDto);
    attributes.forEach((attribute) => {
      if (!createUserDto[attribute]) errors.push(`${attribute} é requerido`);
    });
    if (errors.length > 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: errors,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
