import { motion } from "motion/react";
import { GraduationCap, BookOpen, Users, MapPin, Phone, Mail, Menu, X, ChevronRight, MessageSquare, Newspaper, Award, Globe, Building2, Library, Trophy, Landmark } from "lucide-react";
import { useState, useEffect } from "react";

// --- Types ---
interface NavLink {
  name: string;
  href: string;
}

interface ProgramCardProps {
  title: string;
  description: string;
  category: string;
}

interface StatProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links: NavLink[] = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Admissions", href: "#admissions" },
    { name: "Campus Life", href: "#campus" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4 text-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={`text-2xl font-bold tracking-tight ${scrolled ? "text-nmims-blue" : "text-white"}`}>
              SVKM <span className="text-nmims-gold">NMIMS</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-nmims-gold ${scrolled ? "text-slate-700" : "text-white/90"}`}
                >
                  {link.name}
                </a>
              ))}
              <button 
                id="apply-nav-btn"
                className="bg-nmims-gold text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-nmims-darkblue transition-all transform hover:scale-105"
              >
                Apply Now
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled ? "text-nmims-blue" : "text-white"}`}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white shadow-xl py-4 px-4 space-y-4"
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-slate-700 font-medium hover:text-nmims-gold"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="w-full bg-nmims-blue text-white py-3 rounded-lg font-semibold">
            Apply Online
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const ProgramCard = ({ title, description, category }: ProgramCardProps) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:border-nmims-gold/30 transition-all flex flex-col h-full"
  >
    <div className="text-xs font-bold text-nmims-gold uppercase tracking-widest mb-2">{category}</div>
    <h3 className="text-xl font-bold text-nmims-blue mb-4">{title}</h3>
    <p className="text-slate-600 mb-6 flex-grow">{description}</p>
    <a href="#" className="text-nmims-blue font-semibold flex items-center hover:text-nmims-gold transition-colors">
      Learn More <ChevronRight className="ml-1 w-4 h-4" />
    </a>
  </motion.div>
);

const Stat = ({ label, value, icon }: StatProps) => (
  <div className="text-center">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-nmims-gold/10 text-nmims-gold mb-4">
      {icon}
    </div>
    <div className="text-4xl font-bold text-nmims-blue mb-1">{value}</div>
    <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</div>
  </div>
);

const Feature = ({ title, icon, description }: { title: string; icon: React.ReactNode; description: string }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-12 h-12 bg-nmims-blue rounded-xl flex items-center justify-center text-white">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-bold text-nmims-blue mb-2">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white w-80 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden mb-4"
        >
          <div className="bg-nmims-blue p-4 text-white flex justify-between items-center">
            <div className="font-bold">University Assistant</div>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
          </div>
          <div className="h-64 p-4 overflow-y-auto bg-slate-50">
            <div className="bg-white p-3 rounded-lg text-sm shadow-sm mb-3 text-slate-700">
              Hello! How can I help you today with your NMIMS journey?
            </div>
          </div>
          <div className="p-3 border-t bg-white">
            <input 
              type="text" 
              placeholder="Type your question..." 
              className="w-full text-sm p-2 outline-none border rounded border-slate-200"
            />
          </div>
        </motion.div>
      )}
      <button 
        id="chatbot-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-nmims-blue text-white rounded-full flex items-center justify-center shadow-xl hover:bg-nmims-darkblue transition-all"
      >
        <MessageSquare />
      </button>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 scroll-smooth">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/nmims-campus/1920/1080?blur=1" 
            alt="NMIMS Campus" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-nmims-blue/90 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-white"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-nmims-gold/20 text-nmims-gold text-xs font-bold uppercase tracking-widest mb-6 border border-nmims-gold/30">
              Top Ranked in India
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              SVKM <span className="text-nmims-gold">NMIMS</span> University
            </h1>
            <p className="text-xl text-white/80 mb-10 font-medium">
              Excellence in Education and Innovation. Shaping the leaders of tomorrow with world-class faculty and facilities.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-nmims-gold text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-nmims-blue transition-all shadow-lg hover:shadow-nmims-gold/20">
                Explore Courses
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
                Campus Portal
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <Stat label="Ranking" value="Top 10" icon={<Award />} />
            <Stat label="Programs" value="100+" icon={<BookOpen />} />
            <Stat label="Students" value="25k+" icon={<Users />} />
            <Stat label="Placement" value="100%" icon={<Trophy />} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img 
                  src="https://picsum.photos/seed/nmims-study/800/600" 
                  alt="Student Life" 
                  className="rounded-3xl shadow-2xl relative z-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-nmims-gold/20 rounded-full z-0 blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-nmims-blue/10 rounded-full z-0 blur-2xl" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-bold text-nmims-gold uppercase tracking-[0.2em] mb-4">Legacy of Excellence</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-nmims-blue mb-8 leading-tight">Empowering Minds Since 1981</h3>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                SVKM's NMIMS has always been a premier destination for higher education in India. We believe in providing an environment that fosters creativity, critical thinking, and a sense of responsibility.
              </p>
              <div className="space-y-8">
                <Feature 
                  title="Vision" 
                  icon={<Globe className="w-5 h-5"/>} 
                  description="To be a world-class center of academic excellence and to transform individual lives through belief in the boundless potential of every student."
                />
                <Feature 
                  title="Accreditation" 
                  icon={<Landmark className="w-5 h-5"/>} 
                  description="Accredited with 'A+' Grade by NAAC and recognized as Category 1 University by UGC. Our B-school is AACSB accredited."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-nmims-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-nmims-gold font-bold uppercase tracking-widest mb-4">Academic Excellence</h2>
            <h3 className="text-4xl font-bold mb-4">Programs & Departments</h3>
            <div className="w-20 h-1 bg-nmims-gold mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ProgramCard 
              category="Undergraduate"
              title="Tech & Innovation"
              description="Engineering, IT, and Data Science programs designed for the future digital landscape."
            />
            <ProgramCard 
              category="Postgraduate"
              title="Management Studies"
              description="World-renowned MBA programs with diverse specializations and industry integration."
            />
            <ProgramCard 
              category="Research"
              title="Doctoral Programs"
              description="Advanced PhD programs in various disciplines fostering breakthrough research."
            />
          </div>
        </div>
      </section>

      {/* News & Announcements */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-nmims-gold font-bold uppercase tracking-widest mb-2">Stay Updated</h2>
              <h3 className="text-4xl font-bold text-nmims-blue">News & Announcements</h3>
            </div>
            <button className="hidden md:flex items-center text-nmims-blue font-bold hover:text-nmims-gold transition-colors">
              View All News <ChevronRight className="ml-1 w-5 h-5"/>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-6 aspect-video">
                  <img 
                    src={`https://picsum.photos/seed/news-${i}/600/400`} 
                    alt="News" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                  <Newspaper className="w-4 h-4"/> <span>May {i + 10}, 2026</span>
                </div>
                <h4 className="text-xl font-bold text-nmims-blue mb-4 group-hover:text-nmims-gold transition-colors">
                  Innovators Conclave 2026: NMIMS Students Showcase Breakthrough AI Solutions
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Life */}
      <section id="campus" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 py-10">
              <h2 className="text-nmims-gold font-bold uppercase tracking-widest mb-4">Beyond Academics</h2>
              <h3 className="text-4xl font-bold text-nmims-blue mb-6">Campus Life at NMIMS</h3>
              <p className="text-slate-600 mb-8">
                Discover a vibrant community where learning meets lifestyle. Our campus offers world-class facilities to support your holistic development.
              </p>
              <ul className="space-y-4">
                {['Modern Libraries', 'Advanced Labs', 'Sports Complex', 'Student Clubs', 'Cultural Fests'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-nmims-blue font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-nmims-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/seed/library/600/800" alt="Library" className="rounded-3xl w-full h-full object-cover shadow-xl" referrerPolicy="no-referrer" />
              <div className="grid grid-rows-2 gap-4">
                <img src="https://picsum.photos/seed/lab/600/400" alt="Lab" className="rounded-3xl w-full h-full object-cover shadow-xl" referrerPolicy="no-referrer" />
                <img src="https://picsum.photos/seed/fest/600/400" alt="Fest" className="rounded-3xl w-full h-full object-cover shadow-xl" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions */}
      <section id="admissions" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-nmims-blue/5 -skew-x-12 transform translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-nmims-gold font-bold uppercase tracking-widest mb-4">Join Our Community</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-nmims-blue mb-8">Admission Process 2026</h3>
            <div className="space-y-8">
              {[
                { title: 'Check Eligibility', desc: 'Verify program-specific academic requirements.' },
                { title: 'Apply Online', desc: 'Fill out the application form on our official portal.' },
                { title: 'Entrance Test', desc: 'Prepare for and clear the relevant entrance examinations (NMAT, NPAT, etc.).' },
                { title: 'Selection', desc: 'Participate in personal interviews and group discussions if required.' }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-nmims-gold text-white flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-nmims-blue mb-1">{step.title}</h4>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-12 bg-nmims-blue text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-nmims-gold transition-all shadow-xl">
              Start Application
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-nmims-gold font-bold uppercase tracking-widest mb-4">Contact Us</h2>
              <h3 className="text-4xl font-bold mb-8">Get In Touch With Our Team</h3>
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <MapPin className="text-nmims-gold w-6 h-6 flex-shrink-0" />
                  <p className="text-slate-300">V. L. Mehta Road, Vile Parle (West), Mumbai, Maharashtra 400056, India</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-nmims-gold w-6 h-6 flex-shrink-0" />
                  <p className="text-slate-300">+91 22 4235 5555</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-nmims-gold w-6 h-6 flex-shrink-0" />
                  <p className="text-slate-300">admissions@nmims.edu</p>
                </div>
              </div>
              <div className="h-64 rounded-2xl overflow-hidden bg-slate-800">
                <div className="w-full h-full flex items-center justify-center text-slate-500 italic">
                  [Interactive Campus Map]
                </div>
              </div>
            </div>
            <div className="bg-white p-10 rounded-3xl text-slate-800 shadow-2xl">
              <h4 className="text-2xl font-bold text-nmims-blue mb-6">Inquiry Form</h4>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-nmims-blue transition-all" />
                  <input type="text" placeholder="Last Name" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-nmims-blue transition-all" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-nmims-blue transition-all" />
                <select className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-nmims-blue transition-all appearance-none cursor-pointer">
                  <option>Select Program of Interest</option>
                  <option>MBA / Management</option>
                  <option>Engineering (B.Tech)</option>
                  <option>Commerce & Economics</option>
                  <option>Science</option>
                </select>
                <textarea rows={4} placeholder="Your Message" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-nmims-blue transition-all" />
                <button className="w-full bg-nmims-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-nmims-gold transition-all shadow-lg">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="text-3xl font-bold text-white mb-6">SVKM <span className="text-nmims-gold">NMIMS</span></div>
              <p className="text-slate-400 max-w-sm mb-6">
                A globally recognized center for excellence. Committed to creating change-makers and ethical leaders who contribute positively to society.
              </p>
              <div className="flex gap-4">
                {[Globe, Landmark, Award, BookOpen].map((Icon, idx) => (
                  <div key={idx} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-nmims-gold hover:text-nmims-gold transition-all cursor-pointer">
                    <Icon className="w-5 h-5"/>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-6 text-nmims-gold">Quick Links</h5>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Campus Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Online Fees Payment</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Examination Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Library (e-Resources)</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-6 text-nmims-gold">Resources</h5>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Alumni Network</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research Journals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-slate-500 text-sm">
            &copy; 2026 SVKM's NMIMS University. All rights reserved.
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}
