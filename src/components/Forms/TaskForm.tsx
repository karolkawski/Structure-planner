import { Button, Dropdown, Label, TextInput, Textarea } from 'flowbite-react';
import { Color } from '../../types/Colors.d';
import { Priorities } from '../../types/Priorities.d';
import { Icons } from '../../types/Icons.d';
import Icon from '../UI/Icon/Icon';
import {
  categoriesDropdown,
  colorsDropdown,
  iconsDropdown,
  PrioritiesDropdown,
  tagsSelect,
} from '../Modal/modalFormValues';
import { colorVariants, priorityVariations } from '../Table/stylesVariations';
import React, { useState } from 'react';
import { convertStringToEpoch } from '../../utils/Date';
import { TaskType } from '../../types/Task.d';
import { useNavigate } from 'react-router-dom';
import {
  adFormOrderVariations,
  addFormVariations,
  dropdownOrderVariations,
  tagVariations,
} from './stylesVariations';
import { taskSchema } from '../../Validations/TaskValidation';
import { useSelector } from 'react-redux';
import { State } from '../../store/State.d';

type TaskFormProps = {
  id: string;
  name: string;
  description: string;
  startTime?: string;
  endTime?: string;
  category: string;
  color: string;
  priority: string;
  icon: string;
  tags: string[];
  handleAddTask?: (task: TaskType) => void;
  handleUpdateTask?: (task: TaskType) => void;
  handleRemoveTask?: (selectedId: string) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({
  id,
  name,
  description,
  startTime,
  endTime,
  category,
  color,
  priority,
  icon,
  tags,
  handleAddTask,
  handleRemoveTask,
  handleUpdateTask,
}) => {
  const navigate = useNavigate();
  const blockedHours = useSelector(
    (state: { data: State }) => state.data.blockedHours
  );
  const [selectedId] = useState<string>(id);
  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const [selectedColor, setSelectedColor] = useState<string>(color);
  const [selectedPriority, setSelectedPriority] = useState<string>(priority);
  const [selectedIcon, setSelectedIcon] = useState<string>(icon);
  const [selectedName, setSelectedName] = useState<string>(name);
  const [selectedDescription, setSelectedDescription] =
    useState<string>(description);
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [selectedTags, setSelectedITags] = useState<string[]>(tags);
  const isAddForm: boolean =
    (handleAddTask && typeof handleAddTask === 'function') || false;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    setErrorMessage(null);
    const { value } = event.target;
    // set;

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

  const handleDropdownChange = async (value: string, key: string) => {
    setErrorMessage(null);

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
      default:
        break;
    }
  };

  const handleTagSelect = (value: string) => {
    let updatedArray = [...selectedTags];

    if (selectedTags.length === 0) {
      updatedArray.push(value);
      setSelectedITags(updatedArray);
      return;
    }

    if (selectedTags.includes(value)) {
      updatedArray = selectedTags.filter((tag) => tag !== value);
    } else {
      updatedArray.push(value);
    }

    setSelectedITags(updatedArray);
  };

  return (
    <div className="mx-5">
      <form
        id="taskForm"
        className={`grid gap-2 mb-4 grid-cols-1 md:grid-cols-2 md:gap-4`}
      >
        <div className={`${addFormVariations[isAddForm.toString()]} order-1`}>
          <div className="mb-2 block text-left">
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
        <div
          className={`${addFormVariations[isAddForm.toString()]} flex ${isAddForm ? dropdownOrderVariations[(!isAddForm).toString()] : adFormOrderVariations[isAddForm.toString()]}`}
        >
          <div className="col-2 w-1/2 pr-2">
            <div className="mb-2 block text-left">
              <Label htmlFor="category" value="Category" />
            </div>
            <Dropdown
              label="Select category"
              renderTrigger={() => (
                <Button className="text-nowrap w-full px-3 text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {selectedCategory || 'Select category'}
                </Button>
              )}
            >
              {categoriesDropdown.map((category, index) => {
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
          <div className="col-2 w-1/2 pl-2">
            <div className="mb-2 block text-left">
              <Label htmlFor="priority" value="Priority" />
            </div>
            <Dropdown
              label="Select priority"
              renderTrigger={() => (
                <Button className="text-nowrap	w-full px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {selectedPriority ? (
                    <>
                      <span
                        className={`w-2 h-4 ${priorityVariations[selectedPriority as Priorities]}`}
                      ></span>
                      {selectedPriority}
                    </>
                  ) : (
                    'Select priority'
                  )}
                </Button>
              )}
            >
              {PrioritiesDropdown.map((priority, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    value={priority}
                    onClick={() => handleDropdownChange(priority, 'priority')}
                  >
                    <span
                      className={`w-2 h-4 ${priorityVariations[priority as Priorities]}`}
                    ></span>
                    {priority}
                  </Dropdown.Item>
                );
              })}
            </Dropdown>
          </div>
        </div>
        <div
          className={`${addFormVariations[isAddForm.toString()]} ${dropdownOrderVariations[isAddForm.toString()]}`}
        >
          <div className="mb-2 block text-left">
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
        <div
          className={`${addFormVariations[isAddForm.toString()]} flex ${adFormOrderVariations[(!isAddForm).toString()]}`}
        >
          <div className="w-1/2 pr-2">
            <div className="mb-2 block text-left">
              <Label htmlFor="color" value="Color" />
            </div>
            <Dropdown
              label="Select color"
              renderTrigger={() => (
                <Button className="text-nowrap	w-full px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {selectedColor ? (
                    <>
                      <span
                        className={`w-2 h-4 ${colorVariants[selectedColor as Color]}`}
                      ></span>
                      {selectedColor}
                    </>
                  ) : (
                    'Select color'
                  )}
                </Button>
              )}
            >
              {colorsDropdown.map((color, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    value={color}
                    onClick={() => handleDropdownChange(color, 'color')}
                  >
                    <span
                      className={`w-2 h-4 ${colorVariants[color as Color]}`}
                    ></span>

                    {color}
                  </Dropdown.Item>
                );
              })}
            </Dropdown>
          </div>
          <div className="w-1/2 pl-2">
            <div className="mb-2 block text-left">
              <Label htmlFor="icon" value="Icon" />
            </div>
            <Dropdown
              label="Select icon"
              renderTrigger={() => (
                <Button className="text-nowrap	w-full px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {selectedIcon ? (
                    <>
                      <Icon icon={selectedIcon as Icons} color={'white'} />
                      {selectedIcon}
                    </>
                  ) : (
                    'Select icon'
                  )}
                </Button>
              )}
            >
              {iconsDropdown.map((icon, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    value={icon}
                    onClick={() => handleDropdownChange(icon, 'icon')}
                  >
                    <Icon
                      icon={icon as Icons}
                      color={'black'}
                      className={'pr-2'}
                    />
                    {icon}
                  </Dropdown.Item>
                );
              })}
            </Dropdown>
          </div>
        </div>
        <div
          className={`${addFormVariations[isAddForm.toString()]} flex order-5`}
        >
          <div className="col-2 w-1/2 pr-2">
            <div className="mb-2 block text-left">
              <Label
                htmlFor="stime"
                value={`Start time ${startTime && '(' + startTime + ')'}`}
              />
            </div>
            <TextInput
              id="stime"
              type="time"
              placeholder="8:00"
              min={selectedEndTime}
              value={selectedStartTime}
              onChange={(e) => handleInputChange(e, 'startTime')}
              required
            />
          </div>
          <div className="col-2 w-1/2 pl-2">
            <div className="mb-2 block text-left">
              <Label
                htmlFor="etime"
                value={`End time ${endTime && '(' + endTime + ')'}`}
              />
            </div>
            <TextInput
              id="etime"
              type="time"
              placeholder="10:00"
              max={selectedStartTime}
              value={selectedEndTime}
              onChange={(e) => handleInputChange(e, 'endTime')}
              required
            />
          </div>
        </div>
        <div className={`${addFormVariations[isAddForm.toString()]} order-6`}>
          <div className="mb-2 block text-left">
            <Label htmlFor="tags" value="Tags" />
          </div>
          <div
            className={`${addFormVariations[isAddForm.toString()]} text-left`}
          >
            {tagsSelect.length > 0 &&
              tagsSelect.map((tag, index) => {
                return (
                  <button
                    type="button"
                    onClick={() => {
                      handleTagSelect(tag);
                    }}
                    key={index}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleTagSelect(tag);
                      }
                    }}
                    className={`cursor-pointer text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ${tagVariations[selectedTags.includes(tag) ? 'true' : 'false']}`}
                  >
                    {tag}
                  </button>
                );
              })}
          </div>
        </div>
      </form>
      <p className="text-red-600 h-5">
        {errorMessage ? <>{errorMessage}</> : <></>}
      </p>
      <div className="flex w-full justify-end pt-10">
        <Button
          className="mr-2"
          color=""
          onClick={() => {
            navigate('/tasks');
          }}
        >
          Cancel
        </Button>
        {handleAddTask ? (
          <Button
            className="px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={async () => {
              const formData = {
                id: selectedId,
                name: selectedName,
                description: selectedDescription,
                startTime: selectedStartTime,
                endTime: selectedEndTime,
                category: selectedCategory,
                color: selectedColor,
                icon: selectedIcon,
                priority: selectedPriority,
                blockedHours,
              };

              try {
                setErrorMessage(null);

                await taskSchema.validate(formData);

                handleAddTask({
                  id: selectedId,
                  name: selectedName,
                  description: selectedDescription,
                  startTime: convertStringToEpoch(selectedStartTime),
                  endTime: convertStringToEpoch(selectedEndTime),
                  category: selectedCategory,
                  color: selectedColor as Color,
                  priority: selectedPriority as Priorities,
                  icon: selectedIcon as Icons,
                  tags: selectedTags,
                  isDone: false,
                });
              } catch (error: { message: string }) {
                setErrorMessage(error.message);
                console.error('Validation error:', error.message);
              }
            }}
          >
            Add task
          </Button>
        ) : (
          <></>
        )}

        {handleUpdateTask ? (
          <Button
            className="px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={async () => {
              const formData = {
                id: selectedId,
                name: selectedName,
                description: selectedDescription,
                startTime: selectedStartTime,
                endTime: selectedEndTime,
                category: selectedCategory,
                color: selectedColor,
                icon: selectedIcon,
                priority: selectedPriority,
                blockedHours,
              };
              try {
                setErrorMessage(null);
                await taskSchema.validate(formData);

                handleUpdateTask({
                  id: selectedId as string,
                  name: selectedName,
                  description: selectedDescription,
                  startTime: convertStringToEpoch(selectedStartTime),
                  endTime: convertStringToEpoch(selectedEndTime),
                  category: selectedCategory,
                  color: selectedColor as Color,
                  priority: selectedPriority as Priorities,
                  icon: selectedIcon as Icons,
                  tags: selectedTags,
                  isDone: false,
                });
                navigate('/tasks');
              } catch (error: { message: string }) {
                setErrorMessage(error.message);
                console.error('Validation error:', error.message);
              }
            }}
          >
            Update
          </Button>
        ) : (
          <></>
        )}

        {handleRemoveTask ? (
          <Button
            className="ml-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            color="failure"
            onClick={() => {
              if (!selectedId) {
                return;
              }
              handleRemoveTask(selectedId);
              navigate('/tasks');
            }}
          >
            Remove
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TaskForm;
