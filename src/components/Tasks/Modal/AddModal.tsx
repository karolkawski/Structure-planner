import {
  Button,
  Dropdown,
  Label,
  Modal,
  TextInput,
  Textarea,
} from 'flowbite-react';
import { useState } from 'react';

const AddModal = ({
  openModal,
  setOpenModal,
  handleAddRecord,
}: {
  openModal: boolean;
  setOpenModal: any;
  handleAddRecord: () => unknown;
}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [selectedTag, setSelectedITag] = useState('');

  const colors = ['blue', 'red', 'orange', 'yellow', 'green', 'gray', 'purple'];
  const categories = ['selfcare', 'education', 'work'];
  const icons = ['study', 'work', 'email', 'gym', 'food', 'rest'];
  const piorities = ['low', 'medium', 'high'];
  const tags = ['work', 'study', 'health'];

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    const { value } = event.target;

    switch (key) {
      case 'name':
        setSelectedName(value);
        break;
      case 'description':
        setSelectedDescription(value);
        break;
      case 'startTime':
        setSelectedStartTime(value);
        break;
      case 'endTime':
        setSelectedEndTime(value);
        break;
      default:
        break;
    }
  };

  const handleDropdownChange = (value: string, key: string) => {
    switch (key) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'color':
        setSelectedColor(value);
        break;
      case 'priority':
        setSelectedPriority(value);
        break;
      case 'icon':
        setSelectedIcon(value);
        break;
      case 'tag':
        setSelectedITag(value);
        break;
      default:
        break;
    }
  };

  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Add task</Modal.Header>
      <Modal.Body>
        <form id="taskForm" className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              type="name"
              placeholder="Name"
              value={selectedName}
              onChange={(e) => handleInputChange(e, 'name')}
              required
            />
          </div>
          <div className="col-span-2">
            <div className="mb-2 block">
              <Label htmlFor="description" value="Description" />
            </div>
            <Textarea
              id="description"
              placeholder=""
              value={selectedDescription}
              onChange={(e) => handleInputChange(e, 'description')}
              required
            />
          </div>
          <div className="col-2">
            <div className="mb-2 block">
              <Label htmlFor="stime" value="Start time" />
            </div>
            <TextInput
              id="stime"
              type="time"
              placeholder="8:00"
              value={selectedStartTime}
              onChange={(e) => handleInputChange(e, 'startTime')}
              required
            />
          </div>
          <div className="col-2">
            <div className="mb-2 block">
              <Label htmlFor="etime" value="End time" />
            </div>
            <TextInput
              id="etime"
              type="time"
              placeholder="10:00"
              value={selectedEndTime}
              onChange={(e) => handleInputChange(e, 'endTime')}
              required
            />
          </div>
          <div className="col-2">
            <div className="mb-2 block">
              <Label htmlFor="category" value="Category" />
            </div>
            <Dropdown label={selectedCategory || '---select---'}>
              {categories.map((category, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    value={category}
                    onClick={() => handleDropdownChange(category, 'category')}
                  >
                    {category}
                  </Dropdown.Item>
                );
              })}
            </Dropdown>
          </div>
          <div className="col-2">
            <div className="mb-2 block">
              <Label htmlFor="color" value="Color" />
            </div>
            <Dropdown label={selectedColor || '---select---'}>
              {colors.map((color, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    value={color}
                    onClick={() => handleDropdownChange(color, 'color')}
                  >
                    {color}
                  </Dropdown.Item>
                );
              })}
            </Dropdown>
          </div>
          <div className="col-2">
            <div className="mb-2 block">
              <Label htmlFor="piority" value="Piority" />
            </div>
            <Dropdown label={selectedPriority || '---select---'}>
              {piorities.map((priority, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    value={priority}
                    onClick={() => handleDropdownChange(priority, 'priority')}
                  >
                    {priority}
                  </Dropdown.Item>
                );
              })}
            </Dropdown>
          </div>
          <div className="col-2">
            <div className="mb-2 block">
              <Label htmlFor="icon" value="Icon" />
            </div>
            <Dropdown label={selectedIcon || '---select---'}>
              {icons.map((icon, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    value={icon}
                    onClick={() => handleDropdownChange(icon, 'icon')}
                  >
                    {icon}
                  </Dropdown.Item>
                );
              })}
            </Dropdown>
          </div>
          <div className="col-span-2">
            <div className="mb-2 block">
              <Label htmlFor="tags" value="Tags" />
            </div>
            <div className="col-span-2">
              {tags.length > 0 &&
                tags.map((tag, index) => {
                  return (
                    <span
                      key={`${tag}-${index}`}
                      className="cursor-pointer bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  );
                })}
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={() => handleAddRecord()}></Button> */}
        <Button
          onClick={() =>
            handleAddRecord({
              id: 0,
              name: selectedName,
              description: selectedDescription,
              startTime: selectedStartTime,
              endTime: selectedEndTime,
              category: selectedCategory,
              color: selectedColor,
              priority: selectedPriority,
              icon: selectedIcon,
              tags: selectedTag,
              connectedWith: undefined,
            })
          }
        >
          Add new task
        </Button>

        <Button color="gray" onClick={() => setOpenModal(false)}>
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
