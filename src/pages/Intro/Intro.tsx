import MotionWrapper from '../../Animate/MotionWrapper';
import LayoutWrapper from '../../Layout/LayoutWrapper';
import background from '../../assets/images/phone.png';
import { FaListCheck, FaClock, FaClockRotateLeft } from 'react-icons/fa6';
const Intro = ({}) => {
  return (
    <MotionWrapper>
      <LayoutWrapper>
        <div className="container m-auto text-white lg:grid grid-cols-2 max-h-[900px] pb-5 md:border-b 2xl:pb-10">
          <div className="flex justify-center flex-col">
            <h2 className="text-left font-bold text-2xl my-10">
              Structure Planner - Boost Your Productivity with Ease
            </h2>
            <p className="py-10 text-left text-lg">
              Welcome to Structure Planner, your go-to daily planner app
              designed to help you efficiently organize your day. With a
              user-friendly interface and powerful features, this app provides a
              seamless experience for managing and tracking tasks in a
              structured timeline.
            </p>
            <div>
              <div className="flex justify-between">
                <div className="border border-black-50 h-36 w-36 p-1 rounded flex flex-col">
                  <p className="text-sm">Customizable Task Management</p>
                  <div className="flex justify-center items-center h-full">
                    <FaListCheck size={'2em'} />
                  </div>
                </div>
                <div className="border border-black-50 h-36 w-36 p-1 rounded flex flex-col">
                  <p className="text-sm">Dynamic Timeline Visualization</p>
                  <div className="flex justify-center items-center h-full">
                    <FaClock size={'2em'} />
                  </div>
                </div>
                <div className="border border-black-50 h-36 w-36 p-1 rounded flex flex-col">
                  <p className="text-sm">Midnight Reset for Completed Tasks</p>
                  <div className="flex justify-center items-center h-full">
                    <FaClockRotateLeft size={'2em'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-end pt-10 lg:pt-0">
            <img
              src={background}
              alt="App visualisation"
              className="object-cover md:w-full w-max-[600px]"
            />
          </div>
        </div>
      </LayoutWrapper>
    </MotionWrapper>
  );
};

export default Intro;
