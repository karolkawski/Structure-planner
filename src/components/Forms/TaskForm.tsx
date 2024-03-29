import {
  Button,
  Dropdown,
  Label,
  Modal,
  TextInput,
  Textarea,
} from 'flowbite-react';
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
import { useNavigate } from 'react-router-dom';
import {
  adFormOrderVariations,
  addFormVariations,
  dropdownOrderVariations,
  labelColor,
  tagVariations,
} from './stylesVariations';
import { taskSchema } from '../../Validations/TaskValidation';
import { useSelector } from 'react-redux';
import { State } from '../../store/State.d';
import { TaskFormProps } from '../../types/Form.d';
import { ButtonTheme } from '../../Themes/ButtonTheme';
import { LabelTheme } from '../../Themes/LabelTheme';

const Form = ({
  isAddForm,
  selectedName,
  selectedCategory,
  selectedPriority,
  selectedDescription,
  selectedColor,
  selectedIcon,
  selectedEndTime,
  selectedStartTime,
  selectedTags,
  handleInputChange,
  handleDropdownChange,
  handleTagSelect,
}) => {
  return (
    <form
      id="taskForm"
      className={`grid gap-2 mb-4 grid-cols-1 md:grid-cols-2 md:gap-4`}
    >
      <div className={`${addFormVariations[isAddForm.toString()]} order-1`}>
        <div
          className={`mb-2 block text-left ${labelColor[isAddForm.toString()]}`}
        >
          <Label
            theme={LabelTheme}
            color={labelColor[isAddForm.toString()]}
            htmlFor="name"
            value="Name *"
          />
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
          <div
            className={`mb-2 block text-left ${labelColor[isAddForm.toString()]}`}
          >
            <Label
              theme={LabelTheme}
              color={labelColor[isAddForm.toString()]}
              htmlFor="category"
              value="Category *"
            />
          </div>
          <Dropdown
            label="Select category"
            renderTrigger={() => (
              <Button
                theme={ButtonTheme}
                color="secondary"
                className="text-nowrap w-full px-3"
              >
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
          <div
            className={`mb-2 block text-left ${labelColor[isAddForm.toString()]}`}
          >
            <Label
              theme={LabelTheme}
              color={labelColor[isAddForm.toString()]}
              htmlFor="priority"
              value="Priority *"
            />
          </div>
          <Dropdown
            label="Select priority"
            renderTrigger={() => (
              <Button
                theme={ButtonTheme}
                color="secondary"
                className="text-nowrap w-full px-3"
              >
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
        <div
          className={`mb-2 block text-left ${labelColor[isAddForm.toString()]}`}
        >
          <Label
            theme={LabelTheme}
            color={labelColor[isAddForm.toString()]}
            htmlFor="description"
            value="Description"
          />
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
          <div
            className={`mb-2 block text-left ${labelColor[isAddForm.toString()]}`}
          >
            <Label
              theme={LabelTheme}
              color={labelColor[isAddForm.toString()]}
              htmlFor="color"
              value="Color *"
            />
          </div>
          <Dropdown
            label="Select color"
            renderTrigger={() => (
              <Button
                theme={ButtonTheme}
                color="secondary"
                className="text-nowrap w-full px-3"
              >
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
          <div
            className={`mb-2 block text-left ${labelColor[isAddForm.toString()]}`}
          >
            <Label
              theme={LabelTheme}
              color={labelColor[isAddForm.toString()]}
              htmlFor="icon"
              value="Icon *"
            />
          </div>
          <Dropdown
            label="Select icon"
            renderTrigger={() => (
              <Button
                theme={ButtonTheme}
                color="secondary"
                className="text-nowrap w-full px-3"
              >
                {selectedIcon ? (
                  <>
                    <Icon
                      icon={selectedIcon as Icons}
                      color={'white'}
                      className="pr-2"
                    />
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
          <div
            className={`mb-2 block text-left ${labelColor[isAddForm.toString()]}`}
          >
            <Label
              theme={LabelTheme}
              color={labelColor[isAddForm.toString()]}
              htmlFor="stime"
              value={`Start time *`}
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
          <div
            className={`mb-2 block text-left ${labelColor[isAddForm.toString()]}`}
          >
            <Label
              theme={LabelTheme}
              color={labelColor[isAddForm.toString()]}
              htmlFor="etime"
              value={`End time *`}
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
        <div
          className={`mb-2 block text-left ${labelColor[isAddForm.toString()]}`}
        >
          <Label
            theme={LabelTheme}
            color={labelColor[isAddForm.toString()]}
            htmlFor="tags"
            value="Tags"
          />
        </div>
        <div className={`${addFormVariations[isAddForm.toString()]} text-left`}>
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
                  className={`cursor-pointer text-xs font-medium me-2 px-2.5 py-0.5 rounded ${tagVariations[selectedTags.includes(tag) ? 'true' : 'false']}`}
                >
                  {tag}
                </button>
              );
            })}
        </div>
      </div>
    </form>
  );
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
  setOpenModal,
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
  const [selectedStartTime, setSelectedStartTime] = useState<string>(startTime);
  const [selectedEndTime, setSelectedEndTime] = useState<string>(endTime);
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
    <>
      {setOpenModal ? (
        <>
          <Modal.Body>
            <Form
              isAddForm={isAddForm}
              selectedName={selectedName}
              selectedCategory={selectedCategory}
              selectedPriority={selectedPriority}
              selectedDescription={selectedDescription}
              selectedColor={selectedColor}
              selectedIcon={selectedIcon}
              selectedEndTime={selectedEndTime}
              selectedStartTime={selectedStartTime}
              selectedTags={selectedTags}
              handleInputChange={handleInputChange}
              handleDropdownChange={handleDropdownChange}
              handleTagSelect={handleTagSelect}
            />
            <p className="text-red-600 h-5">
              {errorMessage ? <>{errorMessage}</> : <></>}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex w-full justify-end">
              <Button
                className="mr-2 text-black"
                theme={ButtonTheme}
                color=""
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Cancel
              </Button>
              {handleAddTask ? (
                <Button
                  theme={ButtonTheme}
                  color="secondary"
                  className="px-3"
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
                    } catch (error: unknown) {
                      if (error instanceof Error && 'message' in error) {
                        setErrorMessage(error.message);
                        console.error('Validation error:', error.message);
                      }
                    }
                  }}
                >
                  Add task
                </Button>
              ) : (
                <></>
              )}
            </div>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Form
            isAddForm={isAddForm}
            selectedName={selectedName}
            selectedCategory={selectedCategory}
            selectedPriority={selectedPriority}
            selectedDescription={selectedDescription}
            selectedColor={selectedColor}
            selectedIcon={selectedIcon}
            selectedEndTime={selectedEndTime}
            selectedStartTime={selectedStartTime}
            selectedTags={selectedTags}
            handleInputChange={handleInputChange}
            handleDropdownChange={handleDropdownChange}
            handleTagSelect={handleTagSelect}
          />
          <p className="text-red-600 h-5">
            {errorMessage ? <>{errorMessage}</> : <></>}
          </p>
          <div className="flex w-full justify-end pt-10">
            {handleUpdateTask ? (
              <>
                <Button
                  className="mr-2 text-white"
                  theme={ButtonTheme}
                  color=""
                  onClick={() => {
                    navigate('/tasks');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  theme={ButtonTheme}
                  color="alternativeSecondary"
                  className="px-3"
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
                      currentHours: [startTime, endTime],
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
                    } catch (error: unknown) {
                      if (error instanceof Error && 'message' in error) {
                        setErrorMessage(error.message);
                        console.error('Validation error:', error.message);
                      }
                    }
                  }}
                >
                  Update
                </Button>
              </>
            ) : (
              <></>
            )}

            {handleRemoveTask ? (
              <Button
                className="ml-2 px-3"
                theme={ButtonTheme}
                color="danger"
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
        </>
      )}
    </>
  );
};

export default TaskForm;
