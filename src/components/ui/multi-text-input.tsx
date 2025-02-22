"use client";

import { useState, useEffect, memo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ValueEntry {
  id: number;
  value: string;
}

import React from "react";
type Props = {
  onChange: (name: string, data: string[]) => void;
  initialData?: string[];
  title: string;
  name: string;
};
const MultiTextInput: React.FC<Props> = ({
  onChange,
  initialData,
  title,
  name,
}) => {
  const [values, setValues] = useState<ValueEntry[]>([{ id: 0, value: "" }]);

  useEffect(() => {
    setValues(
      initialData?.length
        ? initialData.map((value, id) => ({ id, value }))
        : [{ id: 0, value: "" }],
    );
  }, [initialData]);

  const addValue = () => {
    if (values.length > 3) return;
    const newId =
      values.length > 0 ? Math.max(...values.map((g) => g.id)) + 1 : 1;
    const newData = [...values, { id: newId, value: "" }];
    setValues(newData);
    const data = newData.map((v) => v.value);
    onChange(name, data);
  };

  const updateValue = (id: number, newValue: string) => {
    const newData = values.map((g) =>
      g.id === id ? { ...g, value: newValue } : g,
    );
    setValues(newData);
    const data = newData.map((v) => v.value);
    onChange(name, data);
  };

  const removeValue = (id: number) => {
    const newData = values.filter((g) => g.id !== id);
    setValues(newData);
    const data = newData.map((v) => v.value);
    onChange(name, data);
  };

  return (
    <div className="w-full space-y-2">
      <Label className="text-base font-semibold">{title}</Label>
      <div className="space-y-2">
        {values.map((entry, index) => (
          <div
            key={entry.id}
            className="flex w-full items-center gap-2 space-x-2"
          >
            <Input
              value={entry.value}
              name={`${name}${entry.id}`}
              onChange={(e) => updateValue(entry.id, e.target.value)}
            />
            {index === 0 ? (
              <Button
                type="button"
                onClick={addValue}
                disabled={values.length >= 4}
                variant="outline"
                size="icon"
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeValue(entry.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(MultiTextInput);
