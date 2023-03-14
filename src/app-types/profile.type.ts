export interface ProfileResponse {
    message:     string;
    status_code: number;
    data:        Data;
}

export interface Data {
    user: User;
}

export interface User {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: null;
    dob:               Date;
    role:              string;
    created_at:        Date;
    updated_at:        Date;
}

export interface ProfileErrorResponse {
    message:     string;
    status_code: number;
}
