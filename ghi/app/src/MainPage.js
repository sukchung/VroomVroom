import "./index.css";

import Carousel from "./Carousel";

export default function MainPage() {
  return (
    <div>
      <div className=" my-5 text-center main-padding">
        <h1 className="display-5 fw-bold white-text">VroomVroom</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 white-text">
            The premiere solution for automobile dealership
            management!
          </p>
        </div>
      </div>
      <Carousel />
    </div>
  );
}
