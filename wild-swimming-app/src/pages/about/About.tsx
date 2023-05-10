import styles from "./about.module.css";

const About = () => {
  return (
    <div>
      <section>
        <h1 className={styles.title}>Welcome to Splash!</h1>
        <section>
          At Splash, <span className={styles.bold}>our mission</span> is to
          provide you with accurate and up-to-date information about the finest
          bathing water spots in England.
        </section>
        <br />
        <section>
          {" "}
          We are a team of passionate individuals who have joined forces to
          develop a reliable platform for water enthusiasts like you. Our team
          comprises five members who share a common love for the great outdoors
          and a profound admiration for England's natural beauty. With diverse
          backgrounds and expertise, we have pooled our skills to create a
          comprehensive resource that ensures your search for and enjoyment of
          bathing waters is effortless and worry-free. We gather data from
          reputable sources such as official agencies, environmental
          organizations, and local authorities to provide you with comprehensive
          information on water quality, amenities, accessibility, and any
          potential hazards associated with each bathing spot.
        </section>
        <section>
          <span className={styles.bold}>Our commitment</span> to accuracy and
          reliability means you can make{" "}
          <span className={styles.bold}>informed choices</span> when planning
          your beach visits. We firmly believe that access to clean and safe
          bathing waters is vital for everyone to enjoy nature responsibly. By
          offering detailed information and recommendations, we aim to empower
          individuals and families to have memorable and worry-free experiences.
        </section>
        <section>
          As a team, we are committed to upholding the highest standards of
          accuracy and reliability in our data. We regularly update our database
          to reflect any changes in water quality assessments, beach facilities,
          or environmental conditions. Our goal is to provide you with the most
          current and relevant information available. We invite you to join our
          growing community of water enthusiasts. Share your experiences,
          discover hidden gems, and contribute to our mission of promoting
          sustainable enjoyment of England's bathing waters.
        </section>
        <section>
          Your involvement can help us create a vibrant and engaged community
          that appreciates and protects these precious natural resources. If you
          have any questions, feedback, or suggestions, please do not hesitate
          to reach out to us. We value your input and are always striving to
          improve our platform to better serve your needs.
        </section>
        <br />
        <section>
          Visit our Contact Us page for more information on how to get in touch.
        </section>
        <br />
        <section>
          Thank you for visiting Splash! We hope you find our website
          informative and helpful in discovering the best bathing waters in
          England.
        </section>
      </section>
    </div>
  );
};

export default About;
