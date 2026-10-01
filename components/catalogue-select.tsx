"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { Icon } from "./icon";

type SelectOption<T extends string> = { value: T; label: string };

function optionAt<T extends string>(options: readonly SelectOption<T>[], current: T, offset: number) {
  const index = options.findIndex((option) => option.value === current);
  const start = index < 0 ? 0 : index;
  const nextIndex = Math.min(options.length - 1, Math.max(0, start + offset));
  return options[nextIndex];
}

export function CatalogueSelect<T extends string>({ label, value, options, onChange }: {
  label: string;
  value: T;
  options: readonly SelectOption<T>[];
  onChange: (value: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeValue, setActiveValue] = useState(value);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(value);
  const listId = useId();
  const labelId = useId();
  const valueId = useId();
  const activeIndex = Math.max(0, options.findIndex((option) => option.value === activeValue));
  const selected = options.find((option) => option.value === value);

  function setActive(next: T) {
    activeRef.current = next;
    setActiveValue(next);
  }

  function selectValue(next: T, close: boolean) {
    setActive(next);
    if (close) setOpen(false);
    if (next === value) return;
    onChange(next);
  }

  useEffect(() => {
    if (open) return;
    activeRef.current = value;
    setActiveValue(value);
  }, [open, value]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!(event.target instanceof Node)) return;
      if (rootRef.current?.contains(event.target)) return;
      setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`${listId}-option-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, listId, open]);

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const key = event.key;
    if (key === "Escape") {
      if (!open) return;
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (key === "ArrowDown" || key === "ArrowUp") {
      event.preventDefault();
      const offset = key === "ArrowDown" ? 1 : -1;
      const current = open ? activeRef.current : value;
      const next = optionAt(options, current, offset);
      if (!next) return;
      setOpen(true);
      selectValue(next.value, false);
      return;
    }
    if (key === "Home" || key === "End") {
      event.preventDefault();
      const next = key === "Home" ? options[0] : options[options.length - 1];
      if (!next) return;
      setOpen(true);
      selectValue(next.value, false);
      return;
    }
    if (key !== "Enter" && key !== " ") return;
    event.preventDefault();
    if (!open) {
      setActive(value);
      setOpen(true);
      return;
    }
    selectValue(activeRef.current, true);
  }

  function onOptionPointerEnter(event: ReactPointerEvent<HTMLLIElement>) {
    const next = options.find((option) => option.value === event.currentTarget.dataset.value);
    if (!next) return;
    setActive(next.value);
  }

  function toggle() {
    if (open) {
      setOpen(false);
      return;
    }
    setActive(value);
    setOpen(true);
  }

  return (
    <div className={`catalogue-select${open ? " open" : ""}`} ref={rootRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${listId}-option-${activeIndex}` : undefined}
        aria-labelledby={`${labelId} ${valueId}`}
        onClick={toggle}
        onKeyDown={onTriggerKeyDown}
      >
        <span id={labelId}>{label}</span>
        <span className="catalogue-select-value" id={valueId}>
          {selected?.label ?? value}
          <Icon name="chevron-down" />
        </span>
      </button>
      {open && (
        <ul id={listId} role="listbox" aria-labelledby={labelId} tabIndex={-1}>
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${listId}-option-${index}`}
              role="option"
              data-value={option.value}
              aria-selected={option.value === value}
              className={option.value === activeValue ? "active" : undefined}
              onPointerEnter={onOptionPointerEnter}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                selectValue(option.value, true);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
