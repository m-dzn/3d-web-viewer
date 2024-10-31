"use client";
import { useEffect, useState } from "react";

import { GLTFRecord } from "@/types";

interface ModelListProps {
  models: GLTFRecord[];
  onChangeModel: (model: GLTFRecord) => void;
}

const ModelList = ({ models, onChangeModel, ...rest }: ModelListProps) => {
  const [activeItem, setActiveItem] = useState<number | undefined>();

  const handleClickItem = (index: number) => {
    setActiveItem(index);
  };

  useEffect(() => {
    if (activeItem === undefined) return;

    const model = models[activeItem];
    onChangeModel(model);
  }, [activeItem]);

  return (
    <ul {...rest} className="w-100 flex flex-col gap-3">
      {models?.map((model, index) => (
        <ModelListItem
          key={`${model.name}-${index}`}
          model={model}
          active={index === activeItem}
          onClick={() => handleClickItem(index)}
        />
      ))}
    </ul>
  );
};

interface ModelListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  model: GLTFRecord;
  active?: boolean;
}

const ModelListItem = ({ model, active, ...rest }: ModelListItemProps) => {
  return (
    <li
      {...rest}
      className={`w-100 h-14 px-4 py-2 bg-white rounded-md flex items-center font-medium box-border cursor-pointer hover:bg-gray-100 border-2  ${
        active ? "border-highlight" : "border-transparent"
      }`}
    >
      {model.name}
    </li>
  );
};

export default ModelList;
