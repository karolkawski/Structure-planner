import LinkedinLogo from '../../assets/images/linkedin-logo.png';
import KatzkyCode from '../../assets/images/katzkycode-logo.png';
import GithubLogo from '../../assets/images/github-logo.png';
import Me from '../../assets/images/me.png';
import MotionWrapper from '../../Layout/MotionWrapper';
import React from 'react';

const About = ({}) => {
  return (
    <MotionWrapper>
      <div className="text-center">
        <header className="w-full">
          <h1 className="text-4xl font-bold my-2">About</h1>
        </header>
        <div className="container p-10 ">
          <div className="flex flex-col md:flex-row justify-between m-auto">
            <div className="flex-2 md:mr-10">
              <h2 className="text-2xl font-bold my-2 md:text-left">
                Description
              </h2>
              <div>
                <p className="md:text-left">
                  <b>EN</b> The application is a daily planner that allows users
                  to add tasks for the current day in a structured format. Users
                  can organize their daily activities efficiently by adding
                  tasks with details such as name, description, start time, end
                  time, category, tags, color, priority, and connections with
                  other tasks. The user interface provides an intuitive and
                  user-friendly experience for creating, updating, and managing
                  tasks. Tasks can be visually represented in a structured
                  timeline, making it easy for users to track their daily
                  schedule and ensure optimal productivity.
                </p>
              </div>
              <div className="mt-10">
                <p className="md:text-left">
                  <b>PL</b> Aplikacja to planer codzienny, który umożliwia
                  użytkownikom dodawanie zadań na aktualny dzień w formie
                  strukturalnej. Użytkownicy mogą efektywnie organizować swoje
                  codzienne aktywności, dodając zadania z takimi szczegółami jak
                  nazwa, opis, czas rozpoczęcia, czas zakończenia, kategoria,
                  tagi, kolor, priorytet i połączenia z innymi zadaniami.
                  Interfejs użytkownika zapewnia intuicyjne i przyjazne do
                  użytku doświadczenie w tworzeniu, aktualizowaniu i zarządzaniu
                  zadaniami. Zadania mogą być wizualnie przedstawione w
                  strukturalnym harmonogramie, co ułatwia użytkownikom śledzenie
                  ich codziennego harmonogramu i zapewnienie optymalnej
                  produktywności.
                </p>
              </div>
            </div>
            <div className="border border-black-50 sm:w-full md:w-80 m-auto mt-10 rounded flex flex-col items-center justify-center p-10">
              <h2 className="text-2xl font-bold my-2"> Credentials</h2>
              <div>
                <img src={Me} width={80} className="mx-auto" alt="Just me" />
              </div>
              <p className="mt-5">
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
                    width={20}
                    className="mr-auto"
                    alt="Linkedin logo"
                    rel="noreferrer"
                  />
                  <p>/karolkawski</p>
                </a>
                <a
                  href="https://github.com/karolkawski"
                  target="_blank"
                  className="flex px-5 py-2"
                  rel="noreferrer"
                >
                  <img
                    src={GithubLogo}
                    width={20}
                    className="mr-auto"
                    alt="Github logo"
                  />
                  /karolkawski
                </a>
              </div>
            </div>
          </div>
          <div className="mt-20 w-80 w-full">
            <div className="mt-10">
              <h3 className="text-xl my-2">Powered by</h3>
              <a
                href="https://katzkycode.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={KatzkyCode}
                  width={250}
                  className="mx-auto"
                  alt="Katzkycode logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
};

export default About;
