import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const response = await auth.login(data.username, data.password);
      // redirect to profile page
      // this.props.history.push("/me");
      if (response.status === 200) {
        toast.success("خوش آمدید");
      }
    } catch (ex) {
      console.log(ex);

      toast.error("خطا در ورود");
    }
  };

  render() {
    return (
      <div className="row justify-content-center align-item-center">
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-12">
          <div className="card my-5 p-4" data-bs-theme="dark">
            <div>
              <div className="row">
                <h1 className="text-center mb-3">ورود</h1>
              </div>
              <div className="row justify-content-center">
                <div className="col gx-5">
                  <form onSubmit={this.handleSubmit} className="form-outline">
                    {this.renderInput("username", "نام کاربری")}
                    {this.renderInput("password", "رمز عبور", "password")}
                    {this.renderButton("ورود")}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
