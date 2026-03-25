function People() {
    return (
      <div className="container  px-3 py-5 ">
        <h2 className="text-center fs-1 mt-5 mb-5" style={{ color: "#424242" }}>People</h2>
        <div className="row">
          <div className="col text-center">
            <img
              src="/media/images/0001.JPG"
              alt="developer img"
              className="img-fluid"
              style={{
                width: "295px",
                height: "295px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <h5 className="mt-3"style={{ color: "#424242" }}>Suhail Hasan</h5>
            <p>Full Stack Developer</p>
          </div>
          <div className="col-12 col-md-7 text-sm-start text-center text-muted">
            <p className="mt-3">
              Suhail Hasan is a dedicated Full-Stack Developer with a core expertise in the
              MERN stack. He specializes in bridging the gap between complex backend logic
              and intuitive frontend experiences. With a sharp focus on building scalable, high-
              performance web applications, Suhail leverages his deep understanding of
              database architecture and API design to deliver seamless digital products.
            </p>
            <p>Playing cricket is his zen.</p>
            <p>
              <div className="flex space-x-4 mt-4">
              Connect on
                <a
                  href="https://www.linkedin.com/in/suhail--hasan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-decoration-none mx-2"
                >
                  LinkedIn
                </a>
                <span>|</span>
                <a
                  href="https://github.com/Suhailhasan0306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500  text-decoration-none mx-2"
                >
                  GitHub
                </a>
              </div>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default People;