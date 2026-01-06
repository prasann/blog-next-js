import Image from "next/image";
import profileImage from "./../../../public/assets/profile0924.jpg";

const FooterCard = () => {
  return (
    <div className="card bg-base-200">
      <div className="card-body items-center text-center md:flex-row md:text-left">
        <figure className="flex-shrink-0">
          <Image
            alt="profile-image"
            className="rounded-full"
            src={profileImage}
            width="64"
            height="64"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </figure>
        <div className="md:ml-4">
          <p className="text-base-content/80">
            Prasanna is an AI/ML application engineer with a background in full-stack web development and extensive experience in architecting enterprise applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterCard;
