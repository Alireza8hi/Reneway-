import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class ProfilePage extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      userName: "",
      phoneNumber: "",
      nationalCode: "",
      email: "",
      role: "",
    },
    errors: {},
  };

  schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    phoneNumber: Joi.string().required().min(11).max(11),
    nationalCode: Joi.number().required(),
    email: Joi.string().required(),
    role: Joi.string().required(),
  };

  // componentDidMount() {
  //     try {
  //         const data = this.props.user;
  //         this.setState({ data });
  //     } catch (ex) {};
  // };

  render() {
    const { data } = this.state;

    return (
      <div className="container" data-bs-theme="dark">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100 mt-4 ">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar text-center my-2">
                      <img
                        src="https://picsum.photos/250/250"
                        alt="Maxwell Admin"
                        style={{ borderRadius: "50%" }}
                        className="img-fluid"
                      />
                    </div>
                    <h4 className="user-name text-center my-3">
                      {data.firstName} {data.lastName}
                    </h4>
                    <h5 className="user-name my-3">{data.userName}</h5>
                    <h6 className="user-email my-3">{data.email}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100 mt-4">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h4 className="mb-2 text-custom">اطلاعات شخصی</h4>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    {this.renderInput("firstName", "نام")}
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    {this.renderInput("lastName", "نام خانوادگی")}
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    {this.renderInput("userName", "نام کاربری")}
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    {this.renderInput("email", "ایمیل", "email")}
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    {this.renderInput("phoneNumber", "شماره موبایل")}
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    {this.renderInput("nationalCode", "کد ملی")}
                  </div>
                  {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    {this.renderInput("role", "نقش")}
                  </div> */}
                </div>

                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right my-4">
                      {/* <button type="button" id="submit" name="submit" className="btn btn-custom">به روز رسانی</button> */}
                      {this.renderButton("به روز رسانی")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
