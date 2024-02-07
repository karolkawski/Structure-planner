import { Button, Dropdown, Label, TextInput, Textarea } from 'flowbite-react';
import { Color } from '../../types/Colors.d';
import { Piorities } from '../../types/Piorities.d';
import { Icons } from '../../types/Icons.d';
import Icon from '../UI/Icon/Icon';
import {
  categoriesDropdown,
  colorsDropdown,
  iconsDropdown,
  pioritiesDropdown,
  tagsSelect,
} from '../Tasks/Modal/modalFormValues';
import { colorVariants, piorityVariations } from '../Tasks/stylesVariations';
import { tagVariations } from '../Tasks/Modal/styles';
import { useState } from 'react';
import { convertStringToEpoch } from '../../utils/Date';
import { TaskType } from '../Task/Task.d';
import { useNavigate } from 'react-router-dom';

const fixedDate = '26-01-2024';

type TaskFormProps = {
  id: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  category: string;
  color: string;
  priority: string;
  icon: string;
  tags: string[];
  handleAddTask?: (task: TaskType) => void;
  handleUpdateTask?: (task: TaskType, selectedId: number) => void;
  handleRemoveTask?: (selectedId: number) => void;
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
  const [selectedId] = useState<number | undefined>(id);
  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const [selectedColor, setSelectedColor] = useState<string>(color);
  const [selectedPriority, setSelectedPriority] = useState<string>(priority);
  const [selectedIcon, setSelectedIcon] = useState<string>(icon);
  const [selectedName, setSelectedName] = useState<string>(name);
  const [selectedDescription, setSelectedDescription] =
    useState<string>(description);
  const [selectedStartTime, setSelectedStartTime] = useState<string>(startTime);
  const [selectedEndTime, setSelectedEndTime] = useState<string>(endTime);
  const [selectedTags, setSelectedITags] = useState<string[]>(tags);

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
        if (selectedEndTime && value > selectedEndTime) {
          return;
        }
        setSelectedStartTime(value);
        break;
      case 'endTime':
        if (selectedStartTime && value < selectedStartTime) {
          return;
        }
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
    <>
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
            min={selectedEndTime}
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
            max={selectedStartTime}
            value={selectedEndTime}
            onChange={(e) => handleInputChange(e, 'endTime')}
            required
          />
        </div>
        <div className="col-2">
          <div className="mb-2 block">
            <Label htmlFor="category" value="Category" />
          </div>
          <Dropdown
            label="---select---}"
            renderTrigger={() => (
              <Button className="w-full">
                {selectedCategory || '---select---'}
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
        <div className="col-2">
          <div className="mb-2 block">
            <Label htmlFor="color" value="Color" />
          </div>
          <Dropdown
            label="---select---}"
            renderTrigger={() => (
              <Button className="w-full">
                {selectedColor ? (
                  <>
                    <span
                      className={`w-2 h-4 ${colorVariants[selectedColor as Color]}`}
                    ></span>
                    {selectedColor}
                  </>
                ) : (
                  '---select---'
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
        <div className="col-2">
          <div className="mb-2 block">
            <Label htmlFor="piority" value="Piority" />
          </div>
          <Dropdown
            label="---select---}"
            renderTrigger={() => (
              <Button className="w-full">
                {selectedPriority ? (
                  <>
                    <span
                      className={`w-2 h-4 ${piorityVariations[selectedPriority as Piorities]}`}
                    ></span>
                    {selectedPriority}
                  </>
                ) : (
                  '---select---'
                )}
              </Button>
            )}
          >
            {pioritiesDropdown.map((priority, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  value={priority}
                  onClick={() => handleDropdownChange(priority, 'priority')}
                >
                  <span
                    className={`w-2 h-4 ${piorityVariations[priority as Piorities]}`}
                  ></span>
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
          <Dropdown
            label="---select---}"
            renderTrigger={() => (
              <Button className="w-full">
                {selectedIcon ? (
                  <>
                    <Icon icon={selectedIcon as Icons} color={'white'} />
                    {selectedIcon}
                  </>
                ) : (
                  '---select---'
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
        <div className="col-span-2">
          <div className="mb-2 block">
            <Label htmlFor="tags" value="Tags" />
          </div>
          <div className="col-span-2">
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
      <div className="flex w-full justify-center pt-10">
        {handleAddTask ? (
          <Button
            onClick={() => {
              handleAddTask({
                id: 0,
                name: selectedName,
                description: selectedDescription,
                startTime: convertStringToEpoch(fixedDate, selectedStartTime),
                endTime: convertStringToEpoch(fixedDate, selectedEndTime),
                category: selectedCategory,
                color: selectedColor as Color,
                priority: selectedPriority as Piorities,
                icon: selectedIcon as Icons,
                tags: selectedTags,
                connectedWith: false,
                isDone: false,
              });
            }}
          >
            Add task
          </Button>
        ) : (
          <></>
        )}

        {handleUpdateTask ? (
          <Button
            onClick={() => {
              handleUpdateTask(
                {
                  id: 0,
                  name: selectedName,
                  description: selectedDescription,
                  startTime: convertStringToEpoch(fixedDate, selectedStartTime),
                  endTime: convertStringToEpoch(fixedDate, selectedEndTime),
                  category: selectedCategory,
                  color: selectedColor as Color,
                  priority: selectedPriority as Piorities,
                  icon: selectedIcon as Icons,
                  tags: selectedTags,
                  connectedWith: false,
                  isDone: false,
                },
                selectedId as number
              );
              navigate('/');
            }}
          >
            Update task
          </Button>
        ) : (
          <></>
        )}

        {handleRemoveTask ? (
          <Button
            color="failure"
            onClick={() => {
              handleRemoveTask(selectedId as number);
              navigate('/');
            }}
          >
            Remove task
          </Button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default TaskForm;
