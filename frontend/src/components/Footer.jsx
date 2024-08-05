import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const FooterComp = () => {
  return (
    <Footer
      container
      className="border border-t-8 border-teal-500"
      style={{
        border: "1px solid teal",
        borderTopWidth: "8px",
        borderColor: "teal"
      }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-sols-1">
          <div className="" style={{marginTop:"1.2rem"}}>
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r  from-purple-600 to-pink-600 rounded-lg text-white">
                Sameer's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
          <div>
            <Footer.Title title="About"/>
            <Footer.LinkGroup col>
                <Footer.Link href="https://www.100jsprojects.com" target="_blank">
                    100 JS Projects
                </Footer.Link>
                <Footer.Link
                    href="/about"
                    target="_blank"
                >
                    Sameer's Blog
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title="Follow Us"/>
            <Footer.LinkGroup col>
                <Footer.Link href="https://www.github/dune1234.com" target="_blank">
                    Github
                </Footer.Link>
                <Footer.Link
                    href="#"
                    target="_blank"
                >
                    Discord
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title="Follow Us"/>
            <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank">
                    Privacy Policy
                </Footer.Link>
                <Footer.Link
                    href="#"
                    target="_blank"
                >
                    Terms &amp; Conditions
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <div>
            <Footer.Divider/>
            <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright href="#" by="Sameer's Blog" year={new Date().getFullYear()}/>
                <div className="flex gap-6 sm:mt-0 sm:justify-center" style={{marginTop:"1rem"}}>
                    <Footer.Icon href="#" icon={BsFacebook} />
                    <Footer.Icon href="#" icon={BsInstagram} />
                    <Footer.Icon href="#" icon={BsTwitter} />
                    <Footer.Icon href="https://www.github/dune1234.com" icon={BsGithub} />
                    <Footer.Icon href="#" icon={BsDribbble} />
                </div>
            </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComp;
