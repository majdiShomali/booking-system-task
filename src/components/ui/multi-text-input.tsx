"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ValueEntry {
  id: number;
  value: string;
}

export default function MultiTextInput({
  onChange,
  initialData,
  title,
}: {
  onChange: (data: string[]) => void;
  initialData: ValueEntry[];
  title: string;
}) {
  const [values, setValues] = useState<ValueEntry[]>(
    initialData?.length === 0 ? [{ id: 0, value: "" }] : initialData
  );

  const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedOnChange = useCallback(
    debounce((updatedValues: ValueEntry[]) => {
      onChange(updatedValues.map((v) => v.value));
    }, 500),
    [onChange]
  );

  useEffect(() => {
    debouncedOnChange(values);
  }, [values, debouncedOnChange]);

  const addValue = () => {
    if (values.length > 3) return;
    const newId = values.length > 0 ? Math.max(...values.map((g) => g.id)) + 1 : 1;
    const newData = [...values, { id: newId, value: "" }];
    setValues(newData);
  };

  const updateValue = (id: number, newValue: string) => {
    const newData = values.map((g) => (g.id === id ? { ...g, value: newValue } : g));
    setValues(newData);
  };

  const removeValue = (id: number) => {
    const newData = values.filter((g) => g.id !== id);
    setValues(newData);
  };

  return (
    <div className="space-y-2 w-full">
      <Label className="text-base font-semibold">{title}</Label>
      <div className="space-y-2">
        {values.map((entry, index) => (
          <div key={entry.id} className="flex items-center space-x-2 gap-2 w-full">
            <Input
              value={entry.value}
              name={`${title}${entry.id}`}
              onChange={(e) => updateValue(entry.id, e.target.value)}
            />
            {index === 0 ? (
              <Button type="button" onClick={addValue} disabled={values.length >= 4} variant="outline" size="icon">
                <PlusCircle className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="outline" size="icon" onClick={() => removeValue(entry.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}