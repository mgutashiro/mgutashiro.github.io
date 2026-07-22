import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SkullLogo from "/src/assets/components/logo/SkullLogo";
import "./SkullReturnMenu.css";

function joinClassNames(...classNames) {
    return classNames.filter(Boolean).join(" ");
}

function ReturnDestination({ item, index, isOpen, onSelect }) {
    const commonProps = {
        className: joinClassNames(
            "skull-return-menu__option",
            `skull-return-menu__option--${item.tone ?? "liquid"}`
        ),
        style: {
            "--skull-option-index": index,
        },
        tabIndex: isOpen ? 0 : -1,
        onClick: (event) => onSelect(item, event),
    };

    if (item.to) {
        return (
            <Link {...commonProps} to={item.to}>
                {item.label}
            </Link>
        );
    }

    if (item.href) {
        return (
            <a
                {...commonProps}
                href={item.href}
                target={item.target}
                rel={item.rel}
            >
                {item.label}
            </a>
        );
    }

    return (
        <button {...commonProps} type="button">
            {item.label}
        </button>
    );
}

/**
 * Reusable horizontal skull navigation.
 *
 * Closed:  [skull] Return
 * Hover:   [shaking skull] Click Me!
 * Open:    [tilted skull] Project Overview  Graveyard Chemist Main
 *
 * Item shape:
 * {
 *   label: string,
 *   tone?: "liquid" | "cyan" | "violet" | "pink" | "wine",
 *   to?: string,
 *   href?: string,
 *   onSelect?: (event) => void,
 * }
 */
export default function SkullReturnMenu({
    className = "",
    label = "Return",
    hoverLabel = "Click Me!",
    menuLabel = "Return destinations",
    items = [],
    logoSize = "nav",
    onOpenChange,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAttentionActive, setIsAttentionActive] = useState(false);
    const rootRef = useRef(null);
    const triggerRef = useRef(null);
    const menuId = `${useId().replace(/[^a-zA-Z0-9_-]/g, "")}-skull-return-menu`;

    function setOpen(nextOpen, { restoreFocus = false } = {}) {
        setIsOpen(nextOpen);
        onOpenChange?.(nextOpen);

        if (!nextOpen) {
            setIsAttentionActive(false);

            if (restoreFocus) {
                requestAnimationFrame(() => triggerRef.current?.focus());
            }
        }
    }

    function handleTriggerClick() {
        setOpen(!isOpen);
    }

    function handleAttentionStart() {
        if (!isOpen) {
            setIsAttentionActive(true);
        }
    }

    function handleAttentionEnd() {
        setIsAttentionActive(false);
    }

    function handleDestinationSelect(item, event) {
        item.onSelect?.(event);

        if (!event.defaultPrevented) {
            setOpen(false);
        }
    }

    useEffect(() => {
        if (!isOpen) return undefined;

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                event.preventDefault();
                setOpen(false, { restoreFocus: true });
            }
        }

        function handlePointerDown(event) {
            if (!rootRef.current?.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [isOpen]);

    const logoState = isOpen
        ? "spill"
        : isAttentionActive
            ? "shake"
            : "idle";

    return (
        <div
            ref={rootRef}
            className={joinClassNames(
                "skull-return-menu",
                isOpen && "is-open",
                className
            )}
        >
            <button
                ref={triggerRef}
                type="button"
                className="skull-return-menu__trigger"
                aria-expanded={isOpen}
                aria-controls={menuId}
                aria-label={isOpen ? "Close return menu" : "Open return menu"}
                onClick={handleTriggerClick}
                onPointerEnter={handleAttentionStart}
                onPointerLeave={handleAttentionEnd}
                onFocus={handleAttentionStart}
                onBlur={handleAttentionEnd}
            >
                <SkullLogo
                    className="skull-return-menu__logo"
                    size={logoSize}
                    state={logoState}
                />

                <span
                    className="skull-return-menu__label"
                    aria-hidden="true"
                >
                    <span className="skull-return-menu__label-default">
                        {label}
                    </span>
                    <span className="skull-return-menu__label-hover">
                        {hoverLabel}
                    </span>
                </span>
            </button>

            <span
                className="skull-return-menu__pour"
                aria-hidden="true"
            >
                <span className="skull-return-menu__pour-drop" />
            </span>

            <nav
                id={menuId}
                className="skull-return-menu__options"
                aria-label={menuLabel}
                aria-hidden={!isOpen}
            >
                {items.map((item, index) => (
                    <ReturnDestination
                        key={`${item.label}-${item.to ?? item.href ?? "action"}`}
                        item={item}
                        index={index}
                        isOpen={isOpen}
                        onSelect={handleDestinationSelect}
                    />
                ))}
            </nav>
        </div>
    );
}