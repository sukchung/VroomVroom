import React from "react";

export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active carousel-image">
                        <img src="https://imagescdn.dealercarsearch.com/dealerimages/17139/20919/fxslide12021.jpg" className="d-block w-100" alt="2021 Kia K5 GT" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Lead with Confidence</h5>
                                <p>2021 Kia K5 GT</p>
                            </div>
                    </div>
                    <div className="carousel-item carousel-image">
                        <img src="https://toyota-cms-media.s3.amazonaws.com/wp-content/uploads/2022/10/2023_Crown_Platinum_BronzeAgeBiTone_H-1500x900.jpg" className="d-block w-100" alt="2023 Toyota Crown" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>New Shape of Innovation</h5>
                                <p>2023 Toyota Crown</p>
                            </div>
                    </div>
                    <div className="carousel-item carousel-image">
                        <img src="https://s7d1.scene7.com/is/image/hyundai/2021-elantra-hev-vlp-hero-grad-1?wid=2560&qlt=85,0&fmt=webp" className="d-block w-100" alt="2023 Hyundai Elantra Hybrid" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Distance Makes the Heart Grow Fonder</h5>
                                <p>2023 Hyundai Elantra Hybrid</p>
                            </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}
