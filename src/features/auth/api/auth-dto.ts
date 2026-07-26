/**
 * Data Transfer Objects (DTOs)
 * Represent exact raw schemas returned or required by the REST backend API.
 */

export interface LoginRequestDto {
  email_address: string;
  user_password: string;
}

export interface UserDto {
  user_id: string;
  email_addr: string;
  display_name: string;
  profile_image?: string;
  account_role: string;
  created_at_timestamp: string;
}

export interface LoginResponseDto {
  access_token: string;
  refresh_token: string;
  user: UserDto;
}
