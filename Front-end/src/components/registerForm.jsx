import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import { toast } from "react-toastify";

class RegisterForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      // age: "",
      phoneNumber: "",
      nationalCode: "",
      email: "",
      // isBusiness: false,
      address: "",
    },
    roles: [
      { _id: "111", name: "بیمار" },
      { _id: "222", name: "پزشک" },
    ],
    errors: {},
  };

  schema = {
    firstName: Joi.string(),
    lastName: Joi.string(),
    username: Joi.string().required("seifjlk"),
    password: Joi.string().required().min(8).max(20),
    // age: Joi.number().required().min(1).max(120),
    phoneNumber: Joi.string(),
    nationalCode: Joi.number(),
    email: Joi.string().required(),
    // role: Joi.string().required(),
    // isBusiness: Joi.boolean(),
    address: Joi.string(),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      console.log(response);
      // redirect to login page
      // window.location = "/login";
      if (response.status === 200) {
        toast.success("کاربر با موفقیت ثبت نام شد");
      }
    } catch (ex) {
      console.log(ex);
      toast.error("خطا در ثبت نام");
    }
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="card p-4 my-5" data-bs-theme="dark">
            <div className="card-body">
              <h1 className="my-3 text-center">ثبت نام</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="row gy-2">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    {this.renderInput("firstName", "نام")}
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    {this.renderInput("lastName", "نام خانوادگی")}
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    {this.renderInput("username", "نام کاربری")}
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    {this.renderInput("email", "ایمیل")}
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    {this.renderInput("password", "رمز عبور")}
                  </div>

                  {/* <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12">
                    {this.renderInput("age", "سن")}
                  </div> */}
                  <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-12">
                    {this.renderInput("phoneNumber", "شماره موبایل")}
                  </div>

                  <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-12 ">
                    {this.renderInput("nationalCode", "کد ملی")}
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    {this.renderInput("address", "آدرس")}
                  </div>

                  {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    {this.renderSelect("role", " نقش", this.state.roles)}
                  </div> */}
                </div>
                {this.renderButton("ثبت نام")}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
