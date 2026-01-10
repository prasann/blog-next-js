import Image from "next/image";
import profileImage from "./../../../public/assets/profile0924.jpg";

const FooterCard = () => {
  return (
    <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
      <figure className="flex-shrink-0">
        <Image
          alt="profile-image"
          className="rounded-full ring-2 ring-blue-400/30"
          src={profileImage}
          width="64"
          height="64"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </figure>
      <div>
        <p className="text-gray-300 leading-relaxed">
          Prasanna is an AI/ML application engineer with a background in full-stack web development and extensive experience in architecting enterprise applications.
        </p>
      </div>
    </div>
  );
};

export default FooterCard;
