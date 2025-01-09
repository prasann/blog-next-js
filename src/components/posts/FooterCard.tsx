import Image from "next/image";
import profileImage from "./../../../public/assets/profile0924.jpg";

const FooterCard = () => {
  return (
    <footer className="items-center flex flex-col md:flex-row justify-center justify-items-center my-4 display-block">
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
      <div className="mt-4 md:mt-0 md:w-6/12 text-center ml-4">
      Prasanna is an AI/ML application engineer with a background in full-stack web development and extensive experience in architecting enterprise applications.
      </div>
    </footer>
  );
};

export default FooterCard;
