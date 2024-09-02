import React from "react";
import "../styles/home.css";

const Feature = ({ title, description, imgSrc, direction }) => {
	return (
		<>
			<div className={`feature-item ${direction}`}>
				<div className="feature-about">
					<div className="feature-title">{title}</div>
					<div className="feature-desc">{description}</div>
				</div>
				<div className="feature-visual">
					<div className="feature-img">
						<img src={imgSrc} alt="Feature Image" />
					</div>
				</div>
			</div>
		</>
	);
};

const Home = () => {
	const testimonials = [
		"I'm thoroughly impressed by the platform's innovative approach. This thoughtful design promises to make learning more efficient, user-friendly and engaging, eliminating the need to switch between multiple tabs. The potential to streamline the learning process is vast. No doubt that this platform will have a profound impact on the future of learning.",
		"The integration of AI -generated teaching paths and AI-driven doubt-solving kits is particularly exciting, as it offers personalized support for students and teachers. The emphasis on integrity and security is also crucial, especially in today's digital landscape.",
		"This is one of the best learning platforms that I came across in long time.It's interface is super easy and effective to use.It's a stop for everyone wanting to learn,practice,asess themselves and many more user-friendly features are available in this all-in-one platform.I highly recommended everyone to give a try to this wonderful platform and get the best for you.Thankyou!.",
		"Your project sounds like a game-changer for educational technology, offering a comprehensive, integrated solution that addresses many of the current challenges in online learning. The emphasis on security, AI-driven features, and preventing academic dishonesty is impressive. I look forward to seeing the UI and experiencing the platform in action.",
		"I've been searching for software like this for ages! This all-in-one solution is a game-changer for me. I no longer need to scour multiple sites, as everything I need is conveniently in one place. The platform expertly organizes various materials and leverages superficial AI technologies to provide swift solutions and study materials, along with numerous other features.",
		"Team Code It's innovative platform is a game-changer for education! Its comprehensive features, AI-driven tools, and secure environment make learning engaging, efficient, and effective. The assignment-based approach ensures students stay on track, while the integrated analytics and live classes provide a seamless experience.",
		"Your project appears to be a game-changer in education, merging essential tools like live classes, exams, and student analytics into one platform. The emphasis on academic integrity and a streamlined, user-friendly experience makes it a compelling alternative to existing systems. I'm eager to see its impact!",
		"Your new platform sounds amazing! It's great that you're putting everything in one place, making it easy for students to access what they need. The use of AI to help teachers and students is also a fantastic feature. I like that it keeps students on track with assignments and timelines, promoting consistent progress.",
		"Prioritizing security and fairness is really important, especially after the challenges faced during the pandemic. I'm excited to see the user interface and give more feedback.",
	];
	return (
		<>
			{/* Hero Section */}
			<section className="hero">
				{/* <video autoPlay muted loop className="video-bg">
					<source src="./video.mp4" type="video/mp4" />
				</video> */}
				<div className="hero-head">
					Unlock the power of learning with
					<span>LecturaX</span>
				</div>
				<div className="hero-subhead">
					LecturaX is a comprehensive educational platform designed to empower
					educators with advanced tools and insights.
				</div>
				<button className="cta-btn">Get Started</button>
			</section>

			{/* Features Section */}
			<section className="features">
				<div className="features-head">
					<span>Discover</span> LecturaX Capabilities
					<p className="features-subhead">Discover LecturaX Capabilities</p>
				</div>

				<div className="feature-container">
					<Feature
						title="Real-time Analytics"
						description="Discover the power of real-time analytics with our advanced dashboard feature. Whether you're tracking individual student progress or analyzing class-wide trends, our dashboard provides you with up-to-the-minute data."
						imgSrc="/vite.svg"
						direction="same"
					/>
					<Feature
						title="AI Chatbot"
						description="Meet your new learning assistant, available 24/7. Our real-time AI chatbot is designed to provide immediate help and guidance, making your learning experience smoother and more engaging."
						imgSrc="/vite.svg"
						direction="reverse"
					/>
					<Feature
						title="Upload Functionality"
						description="Our chatbot goes beyond just answering questions—it allows you to upload files, photos, and books, making it a versatile tool for all your learning needs. Easily upload documents, photos, or books and ask the AI questions about the content."
						imgSrc="/vite.svg"
						direction="same"
					/>
					<Feature
						title="User-friendly Platform"
						description="Experience a platform designed with you in mind. Our site is crafted to be user-friendly and highly interactive, ensuring that both teachers and students can navigate with ease and engage fully in their educational journey."
						imgSrc="/vite.svg"
						direction="reverse"
					/>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="testimonials">
				<div className="testimonial-intro">
					<div className="testimonial-caption">TESTIMONIALS</div>
					<div className="testimonial-title">
						Don't just take <span>our word</span> for it!
					</div>
					<div className="testimonial-subtitle">
						See what the community has to say about LecturaX
					</div>
				</div>
				<div className="scroll-wrapper">
					<div className="testimonial-container">
						<div className="carousel-primary">
							{testimonials.map((testimonial, index) => (
								<div key={index} className="testimonial-card">
									<p>{testimonial}</p>
								</div>
							))}
						</div>
						<div className="carousel-secondary">
							{testimonials.map((testimonial, index) => (
								<div key={index} className="testimonial-card">
									<p>{testimonial}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
