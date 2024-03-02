import LinkedinLogo from '../../assets/images/linkedin-logo.png';
import KatzkyCode from '../../assets/images/katzkycode-logo.png';
import GithubLogo from '../../assets/images/github-logo.png';
import Me from '../../assets/images/me.png';
import MotionWrapper from '../../Animate/MotionWrapper';
import React from 'react';
import LayoutWrapper from '../../Layout/LayoutWrapper';
import Header from '../../components/UI/Header/Header';

const Credentials = ({}) => {
  return (
    <MotionWrapper primary={false}>
      <LayoutWrapper paddingTop={true}>
        <Header title="Credentials" />
        <div className="container m-auto h-[calc(100%-44px)] max-h-[900px] border rounded-lg">
          <div className="flex flex-col justify-between h-full">
            <div className="border border-black-50 w-80 mx-auto flex flex-col items-center justify-center p-10 mt-5 rounded-lg">
              <div className="h-20">
                <img
                  src={Me}
                  width={80}
                  className="mx-auto"
                  alt="Just me"
                  loading="lazy"
                />
              </div>
              <p className="mt-5 text-lg">
                <b>Contact</b> karol.kawski@protonmail.com
              </p>
              <div className="mt-5 w-60 m-auto">
                <a
                  href="https://www.linkedin.com/in/karolkawski/"
                  target="_blank"
                  className="flex px-5 py-2"
                  rel="noreferrer"
                >
                  <img
                    src={LinkedinLogo}
                    loading="lazy"
                    width={20}
                    className="mr-auto"
                    alt="Linkedin logo"
                    rel="noreferrer"
                  />
                  <p className="text-base">/karolkawski</p>
                </a>
                <a
                  href="https://github.com/karolkawski"
                  target="_blank"
                  className="flex px-5 py-2"
                  rel="noreferrer"
                >
                  <img
                    src={GithubLogo}
                    loading="lazy"
                    width={20}
                    className="mr-auto"
                    alt="Github logo"
                  />
                  <p className="text-base">/karolkawski</p>
                </a>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-center items-center">
                <h3 className="text-sm my-2">Powered by</h3>
                <a
                  href="https://katzkycode.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    loading="lazy"
                    src={KatzkyCode}
                    width={100}
                    className="mx-auto"
                    alt="Katzkycode logo"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </MotionWrapper>
  );
};

export default Credentials;
