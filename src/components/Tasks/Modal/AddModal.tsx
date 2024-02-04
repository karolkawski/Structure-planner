import { Button, Modal } from 'flowbite-react';

const Add = ({ openModal, setOpenModal }) => {
  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Terms of Service</Modal.Header>
      <Modal.Body>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type task name"
              required={true}
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Task Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write task description here"
            ></textarea>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="startTime"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Start time
            </label>
            <input
              type="text"
              name="stime"
              id="startTimme"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="8:00"
              required={true}
            />
          </div>
          <div className="col-span-2 sm:col-span-1 new">
            <label
              htmlFor="endTime"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              End time
            </label>
            <input
              type="text"
              name="etime"
              id="endTime"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="10:00"
              required={true}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option selected={true}>Select category</option>
              <option value="TV">TV/Monitors</option>
              <option value="PC">PC</option>
              <option value="GA">Gaming/Console</option>
              <option value="PH">Phones</option>
            </select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="piority"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Piority
            </label>
            <select
              id="piority"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option selected={true}>Select piority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">Heigh</option>
            </select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="color"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Color
            </label>
            <select
              id="color"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option selected={true}>Select color</option>
              <option value="TV">TV/Monitors</option>
              <option value="PC">PC</option>
              <option value="GA">Gaming/Console</option>
              <option value="PH">Phones</option>
            </select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="icon"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Icon
            </label>
            <select
              id="icon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option selected={true}>Select icon</option>
              <option value="TV">TV/Monitors</option>
              <option value="PC">PC</option>
              <option value="GA">Gaming/Console</option>
              <option value="PH">Phones</option>
            </select>
          </div>
          <div className="col-span-2 ">
            <label
              htmlFor="tags"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tags
            </label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setOpenModal(false)}>Add new task</Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Add;
