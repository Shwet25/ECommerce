class UserNotFound extends Error {
    constructor(message = "User Does Not Found try with register email") {
        super(message);
        this.isOprational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

class InvalidPassword extends Error{
    constructor(message = "Invalid Password try with valid password") {
        super(message);
        this.isOprational = true;

        Error.captureStackTrace(this, this.constructor);
    }

}
module.exports = UserNotFound,InvalidPassword ;


// export class PrimaryKeyViolation extends Error {
//     constructor(message = "Primary Key Violation. Please try with another email id as this email id already has an account") {
//       super(message);
//       Object.setPrototypeOf(this, PrimaryKeyViolation.prototype)
//     }
//   }