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
      <div className="mt-4 md:mt-0 md:w-6/12 text-center">
        {" "}
        Prasanna is a full stack web developer, with exposure to various
        programming languages. Uses mostly Java, Javascript these days and got
        ~13 years of architecting and coding enterprise software solutions.{" "}
      </div>
    </footer>
  );
};

export default FooterCard;
