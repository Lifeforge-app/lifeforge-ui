import React$1, { ReactNode } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { ScrollbarProps } from 'react-custom-scrollbars';

interface ButtonProps {
    children?: React$1.ReactNode;
    icon: string;
    iconAtEnd?: boolean;
    iconClassName?: string;
    onClick?: (e: React$1.MouseEvent<HTMLButtonElement>) => void;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    variant?: "primary" | "secondary" | "no-bg";
    isRed?: boolean;
    namespace?: string;
    tKey?: string;
    tProps?: Record<string, unknown>;
}
type ButtonComponentProps<C extends React$1.ElementType = "button"> = {
    as?: C;
} & ButtonProps & Omit<React$1.ComponentPropsWithoutRef<C>, keyof ButtonProps>;
declare function Button<C extends React$1.ElementType = "button">({ as, children, icon, onClick, ...props }: ButtonComponentProps<C>): React$1.ReactElement;
declare const _default$2: typeof Button;

declare function Switch({ checked, onChange }: {
    checked: boolean;
    onChange: () => void;
}): React$1.ReactElement;

declare function Checkbox({ checked, onChange, className }: {
    checked: boolean;
    onChange: (e: React$1.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}): React$1.ReactElement;

declare function FAB({ onClick, icon, text, hideWhen, alwaysShow, as, isRed, loading }: {
    onClick?: () => void;
    icon?: string;
    hideWhen?: 'sm' | 'md' | 'lg' | 'xl';
    alwaysShow?: boolean;
    text?: string;
    as?: React$1.ElementType;
    isRed?: boolean;
    loading?: boolean;
}): React$1.ReactElement;

declare function GoBackButton({ onClick }: {
    onClick: () => void;
}): React$1.ReactElement;

declare function CreateOrModifyButton({ type, loading, onClick, disabled, className }: {
    type: 'create' | 'update' | 'rename' | null;
    loading: boolean;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}): React$1.ReactElement;

interface MenuProps {
    children: React$1.ReactNode;
    className?: string;
    customTailwindColor?: string;
    customHoverColor?: string;
    style?: React$1.CSSProperties;
    lighter?: boolean;
    largerPadding?: boolean;
    largerIcon?: boolean;
    smallerPadding?: boolean;
    customWidth?: string;
    customIcon?: string;
    onButtonClick?: (e: React$1.MouseEvent<HTMLButtonElement>) => void;
    onClose?: () => void;
}
declare function HamburgerMenu(props: MenuProps): React$1.ReactElement;

declare function HamburgerSelectorWrapper({ icon, title, children, className }: {
    icon: string;
    title: string;
    children: React$1.ReactNode;
    className?: string;
}): React$1.ReactElement;

declare function MenuItem({ icon, text, isRed, onClick, isToggled, disabled, preventDefault, namespace, loading, }: {
    icon?: string | React$1.ReactElement;
    text: string;
    isRed?: boolean;
    onClick: (e: React$1.MouseEvent<HTMLButtonElement>, close: () => void) => void;
    isToggled?: boolean;
    disabled?: boolean;
    preventDefault?: boolean;
    namespace?: string | false;
    loading?: boolean;
}): React$1.ReactElement;

interface IInputProps {
    icon: string;
    name: string;
    placeholder: string;
    value: string;
    setValue: (value: string) => void;
    inputMode?: "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
    actionButtonIcon?: string;
    actionButtonLoading?: boolean;
    autoFocus?: boolean;
    className?: string;
    darker?: boolean;
    disabled?: boolean;
    isPassword?: boolean;
    noAutoComplete?: boolean;
    onActionButtonClick?: (e: React$1.MouseEvent<HTMLButtonElement>) => void;
    onKeyDown?: (e: React$1.KeyboardEvent<HTMLInputElement>) => void;
    ref?: React$1.RefObject<HTMLInputElement | null>;
    required?: boolean;
    namespace: string | false;
    tKey?: string;
}
declare function TextInput({ actionButtonIcon, actionButtonLoading, autoFocus, className, darker, disabled, icon, inputMode, isPassword, name, noAutoComplete, onActionButtonClick, onKeyDown, placeholder, ref, required, setValue: setValue, value, namespace, tKey, }: IInputProps): React$1.ReactElement;
declare const _default$1: React$1.MemoExoticComponent<typeof TextInput>;

declare function IconInput({ name, icon, setIcon, setIconSelectorOpen, namespace, }: {
    name: string;
    icon: string;
    setIcon: (icon: string) => void;
    setIconSelectorOpen: React$1.Dispatch<React$1.SetStateAction<boolean>>;
    namespace: string;
}): React$1.ReactElement;

declare function ColorInput({ name, color, setColor: updateColor, setColorPickerOpen, hasTopMargin, className, namespace, }: {
    name: string;
    color: string;
    setColor: (value: string) => void;
    setColorPickerOpen: React$1.Dispatch<React$1.SetStateAction<boolean>>;
    hasTopMargin?: boolean;
    className?: string;
    namespace: string;
}): React$1.ReactElement;

declare function ImageAndFileInput({ icon, name, reminderText, image, preview, setPreview, setImage, setImagePickerModalOpen, onImageRemoved, required, namespace, }: {
    icon: string;
    name: string;
    reminderText?: string;
    image: string | File | null;
    preview: string | null;
    setPreview: (value: string | null) => void;
    setImage: (value: string | File | null) => void;
    setImagePickerModalOpen: React$1.Dispatch<React$1.SetStateAction<boolean>>;
    onImageRemoved?: () => void;
    required?: boolean;
    namespace: string;
}): React$1.ReactElement;

interface IGeneralProps {
    name: string;
    icon: string;
    value: any;
    setValue: (value: any) => void;
    className?: string;
    children: React$1.ReactNode;
    customActive?: boolean;
    required?: boolean;
    namespace: string | false;
    tKey?: string;
}
interface IListboxProps extends IGeneralProps {
    type: "listbox";
    buttonContent: React$1.ReactElement;
    multiple?: boolean;
}
interface IComboboxProps extends IGeneralProps {
    type: "combobox";
    setQuery: (query: string) => void;
    displayValue: (value: any) => string;
}
type IListboxOrComboboxInputProps = IListboxProps | IComboboxProps;
declare function ListboxOrComboboxInput(props: IListboxOrComboboxInputProps): React$1.ReactElement;

interface DateInputProps {
    date: string;
    setDate: (date: string) => void;
    name: string;
    icon: string;
    hasMargin?: boolean;
    className?: string;
    darker?: boolean;
    modalRef?: React$1.RefObject<HTMLElement | null>;
    index?: number;
    required?: boolean;
    hasTime?: boolean;
    namespace: string;
}
declare const DateInput: React$1.FC<DateInputProps>;

declare function CurrencyInputComponent({ name, placeholder, icon, value, setValue, darker, className, required, namespace, }: {
    reference?: React$1.RefObject<HTMLInputElement | null>;
    name: string;
    placeholder: string;
    icon: string;
    value: string | undefined;
    setValue: (value: string) => void;
    darker?: boolean;
    className?: string;
    required?: boolean;
    namespace: string;
}): React$1.ReactElement;

declare function SearchInput({ searchQuery, setSearchQuery, stuffToSearch, onKeyUp, customIcon, hasTopMargin, onFilterIconClick, filterAmount, sideButtonIcon, onSideButtonClick, className, namespace, tKey, }: {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    stuffToSearch: string;
    onKeyUp?: (e: React$1.KeyboardEvent<HTMLInputElement>) => void;
    customIcon?: string;
    hasTopMargin?: boolean;
    onFilterIconClick?: () => void;
    filterAmount?: number;
    sideButtonIcon?: string;
    onSideButtonClick?: () => void;
    className?: string;
    namespace: string;
    tKey?: string;
}): React$1.ReactElement;

interface ITagsInputProps {
    name: string;
    icon: string;
    placeholder: string;
    value: string[];
    setValue: (tags: string[]) => void;
    maxTags?: number;
    disabled?: boolean;
    className?: string;
    darker?: boolean;
    existedTags?: Array<{
        name: string;
        icon: string;
        color: string;
    }>;
    required?: boolean;
    namespace: string;
    tKey?: string;
}
declare function TagsInput({ name, icon, placeholder, value, setValue, maxTags, disabled, className, darker, existedTags, required, namespace, tKey, }: ITagsInputProps): React$1.ReactElement;

declare function LocationInput({ location, setLocation, namespace, label, }: {
    location: string | null;
    setLocation: (value: string | null) => void;
    namespace: string;
    label?: string;
}): React$1.ReactElement;

declare function ListboxOrComboboxOption({ value, text, icon, iconAtEnd, color, type, matchedSubstrings, noCheckmark }: {
    value: string | number | Record<string, any> | null;
    text: string;
    icon?: string | React$1.ReactElement;
    iconAtEnd?: boolean;
    color?: string;
    type?: 'listbox' | 'combobox';
    matchedSubstrings?: Array<{
        length: number;
        offset: number;
    }>;
    noCheckmark?: boolean;
}): React$1.ReactElement;

declare function ListboxOrComboboxOptions({ type, children, customWidth, lighter }: {
    type?: 'listbox' | 'combobox';
    children: React$1.ReactNode;
    customWidth?: string;
    lighter?: boolean;
}): React$1.ReactElement;

declare function ListboxNullOption({ icon, value, hasBgColor, text }: {
    icon: string;
    value?: any;
    hasBgColor?: boolean;
    text?: string;
}): React$1.ReactElement;

declare function ImagePickerModal({ isOpen, onClose, enablePixaBay, enableUrl, acceptedMimeTypes, onSelect, }: {
    isOpen: boolean;
    onClose: () => void;
    enablePixaBay?: boolean;
    enableUrl?: boolean;
    acceptedMimeTypes: Record<string, string[]>;
    onSelect: (file: string | File, preview: string | null) => Promise<void>;
}): React$1.ReactElement;

declare function ColorPickerModal({ isOpen, setOpen, color, setColor, }: {
    isOpen: boolean;
    setOpen: React$1.Dispatch<React$1.SetStateAction<boolean>>;
    color: string;
    setColor: (color: string) => void;
}): React$1.ReactElement;

declare function IconPickerModal({ isOpen, setOpen, setSelectedIcon, }: {
    isOpen: boolean;
    setOpen: React$1.Dispatch<React$1.SetStateAction<boolean>>;
    setSelectedIcon: (icon: string) => void;
}): React$1.ReactElement;

declare function InputWrapper({ darker, className, disabled, inputRef, children }: {
    darker?: boolean;
    className?: string;
    disabled?: boolean;
    inputRef?: React$1.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
    children: React$1.ReactNode;
}): React$1.ReactElement;

declare function InputIcon({ icon, active, listboxOrCombobox, className }: {
    icon: string;
    active: boolean;
    listboxOrCombobox?: 'listbox' | 'combobox';
    className?: string;
}): React$1.ReactElement;
declare const _default: React$1.MemoExoticComponent<typeof InputIcon>;

interface InputLabelProps {
    label: string;
    active: boolean;
    isCombobox?: boolean;
    isListboxOrCombobox?: boolean;
    required?: boolean;
}
declare const InputLabel: React$1.FC<InputLabelProps>;

declare function QRCodeScanner({ isOpen, onClose, onScanned, }: {
    isOpen: boolean;
    onClose: () => void;
    onScanned: (data: string) => void;
}): React$1.ReactElement;

declare function DnDContainer({ getRootProps, getInputProps, isDragActive, }: {
    getRootProps: any;
    getInputProps: any;
    isDragActive: boolean;
}): React$1.ReactElement;

declare function PreviewContainer({ preview, setPreview, file, setFile, fileName, onRemove, }: {
    preview: string | null;
    setPreview: (preview: string | null) => void;
    file: File | null;
    setFile: (file: File | null) => void;
    fileName?: string;
    onRemove?: () => void;
}): React$1.ReactElement;

interface ITextInputFieldProps {
    label: string;
    icon: string;
    type: 'text';
    isPassword?: boolean;
    placeholder: string;
    disabled?: boolean;
    qrScanner?: boolean;
}
interface IDateInputFieldProps {
    label: string;
    icon: string;
    type: 'datetime';
    index: number;
    hasTime?: boolean;
    modalRef: React.RefObject<HTMLDivElement | null>;
}
interface IListboxInputFieldProps {
    label: string;
    icon: string;
    type: 'listbox';
    options: Array<{
        value: string;
        text: string;
        icon?: string;
        color?: string;
    }>;
    nullOption?: string;
    multiple?: boolean;
}
interface IColorInputFieldProps {
    label: string;
    type: 'color';
}
interface IIconInputFieldProps {
    label: string;
    type: 'icon';
}
interface IImageAndFileInputFieldProps {
    label: string;
    type: 'file';
    onFileRemoved?: () => void;
}
interface ILocationInputFieldProps {
    label: string;
    type: 'location';
}
type IFieldProps<T> = (ITextInputFieldProps | IDateInputFieldProps | IListboxInputFieldProps | IColorInputFieldProps | IIconInputFieldProps | IImageAndFileInputFieldProps | ILocationInputFieldProps) & {
    id: keyof T;
};

declare function FormModal<T extends Record<string, any | any[]>>({ fields, data, setData, title, icon, isOpen, openType, onClose, loading, onSubmit, id, endpoint, queryKey, getFinalData, sortBy, sortMode, submitButtonProps, customUpdateDataList, actionButtonIcon, actionButtonIsRed, onActionButtonClick, namespace, modalRef, }: {
    modalRef?: React$1.RefObject<HTMLDivElement | null>;
    fields: IFieldProps<T>[];
    data: T;
    setData: React$1.Dispatch<React$1.SetStateAction<T>>;
    title: string;
    icon: string;
    isOpen: boolean;
    openType?: "create" | "update" | null;
    onClose: () => void;
    submitButtonProps?: React$1.ComponentProps<typeof _default$2>;
    onSubmit?: () => Promise<void>;
    queryKey?: unknown[];
    endpoint?: string;
    id?: string;
    loading?: boolean;
    actionButtonIcon?: string;
    actionButtonIsRed?: boolean;
    onActionButtonClick?: () => void;
    namespace: string;
    getFinalData?: (originalData: T) => Promise<Record<string, any>>;
    sortBy?: keyof T;
    sortMode?: "asc" | "desc";
    customUpdateDataList?: {
        create?: (newData: any) => void;
        update?: (newData: any) => void;
    };
}): React$1.ReactElement;

declare function DeleteConfirmationModal({ itemName, isOpen, onClose, data, updateDataList, apiEndpoint, customTitle, customText, nameKey, customCallback, customConfirmButtonIcon, customConfirmButtonText, customOnClick, queryKey, multiQueryKey, }: {
    itemName?: string;
    isOpen: boolean;
    onClose: () => void;
    data?: any | string[];
    updateDataList?: () => void;
    apiEndpoint?: string;
    customTitle?: string;
    customText?: string;
    nameKey?: string;
    customCallback?: () => Promise<void>;
    customConfirmButtonIcon?: string;
    customConfirmButtonText?: string;
    customOnClick?: () => Promise<void>;
    queryKey?: unknown[] | unknown[][];
    multiQueryKey?: boolean;
}): React$1.ReactElement;

declare function ModalHeader({ title, needTranslate, icon, hasAI, onClose, actionButtonIcon, actionButtonIsRed, onActionButtonClick, className, appendTitle, namespace, }: {
    title: string;
    needTranslate?: boolean;
    icon: string;
    hasAI?: boolean;
    onClose: () => void;
    actionButtonIcon?: string;
    actionButtonIsRed?: boolean;
    onActionButtonClick?: () => void;
    className?: string;
    appendTitle?: React$1.ReactElement;
    namespace?: string;
}): React$1.ReactElement;

declare function ModalWrapper({ isOpen, children, minWidth, minHeight, maxWidth, className, modalRef }: {
    isOpen: boolean;
    children: React$1.ReactNode;
    minWidth?: string;
    minHeight?: string;
    maxWidth?: string;
    className?: string;
    modalRef?: React$1.RefObject<HTMLDivElement | null>;
}): React$1.ReactElement;

declare function SidebarWrapper({ isOpen, setOpen, customHeight, children, }: {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    customHeight?: string;
    children: React$1.ReactNode;
}): React$1.ReactElement;

type SidebarItemAutoActiveProps = {
    autoActive: true;
    active?: never;
} | {
    autoActive?: false;
    active: boolean;
};
interface MainSidebarItemProps {
    isMainSidebarItem: true;
    showAIIcon: boolean;
    subsection?: string[][];
    prefix?: string;
    sidebarExpanded: boolean;
    toggleSidebar: () => void;
    sideStripColor?: never;
    onClick?: never;
    number?: never;
    onCancelButtonClick?: never;
    hamburgerMenuItems?: never;
    isCollapsed?: never;
    onCollapseButtonClick?: never;
    showCollapseSpacer?: never;
    namespace?: never;
    needTranslate?: never;
}
interface SubSidebarItemProps {
    isMainSidebarItem?: false;
    showAIIcon?: never;
    subsection?: never;
    prefix?: never;
    sidebarExpanded?: never;
    toggleSidebar?: never;
    onClick: () => void;
    sideStripColor?: string;
    number?: number;
    onCancelButtonClick?: () => void;
    hamburgerMenuItems?: React$1.ReactElement;
    isCollapsed?: boolean;
    onCollapseButtonClick?: () => void;
    showCollapseSpacer?: boolean;
    namespace?: string;
    needTranslate?: boolean;
}
interface SidebarItemBaseProps {
    name: string;
    icon?: string | React$1.ReactElement;
}
type SidebarItemProps$1 = SidebarItemAutoActiveProps & (MainSidebarItemProps | SubSidebarItemProps) & SidebarItemBaseProps;
declare function SidebarItem({ name, icon, sideStripColor, showAIIcon, subsection, isMainSidebarItem, sidebarExpanded, toggleSidebar, onClick, autoActive, active, prefix, number, onCancelButtonClick, hamburgerMenuItems, isCollapsed, onCollapseButtonClick, showCollapseSpacer, namespace, needTranslate, }: SidebarItemProps$1): React$1.ReactElement;

interface PropsWithActionButton {
    actionButtonIcon: string | undefined;
    actionButtonOnClick: (() => void) | undefined;
}
interface PropsWithoutActionButton {
    actionButtonIcon?: never;
    actionButtonOnClick?: never;
}
type SidebarItemProps = {
    name: string;
    namespace?: string;
    customActionButton?: React$1.ReactElement;
} & (PropsWithActionButton | PropsWithoutActionButton);
declare function SidebarTitle({ name, actionButtonIcon, actionButtonOnClick, customActionButton, namespace, }: SidebarItemProps): React$1.ReactElement;

declare function SidebarDivider({ noMargin, }: {
    noMargin?: boolean;
}): React$1.ReactElement;

type Loadable<T> = T | 'loading' | 'error';

declare function APIFallbackComponent<T>({ data, children, showLoading }: {
    data: Loadable<T>;
    children: (data: T) => React$1.ReactElement | false;
    showLoading?: boolean;
}): React$1.ReactElement;

declare function ErrorScreen({ message }: {
    message: string;
}): React$1.ReactElement;

declare function LoadingScreen({ customMessage }: {
    customMessage?: string;
}): React$1.ReactElement;

declare function CreatePasswordScreen({ endpoint, }: {
    endpoint: string;
}): React$1.ReactElement;

declare function EmptyStateScreen({ onCTAClick, name, title, description, icon, ctaContent, ctaTProps, ctaIcon, customCTAButton, smaller, namespace, tKey }: {
    onCTAClick?: React$1.Dispatch<React$1.SetStateAction<'create' | 'update' | null>>;
    name: string | false;
    title?: string;
    description?: string;
    icon?: string | React$1.ReactElement;
    ctaContent?: string;
    ctaTProps?: Record<string, unknown>;
    ctaIcon?: string;
    customCTAButton?: React$1.ReactElement;
    smaller?: boolean;
    namespace: string | false;
    tKey?: string;
}): React$1.ReactElement;

declare function LockedScreen({ endpoint, setMasterPassword, }: {
    endpoint: string;
    setMasterPassword: React$1.Dispatch<React$1.SetStateAction<string>>;
}): React$1.ReactElement;

declare function NotFoundScreen(): React$1.ReactElement;

declare function MissingAPIKeyScreen({ requiredAPIKeys, }: {
    requiredAPIKeys: string[];
}): React$1.ReactElement;

declare function OTPScreen({ endpoint, callback, }: {
    endpoint: string;
    callback: () => void;
}): React$1.ReactElement;

declare function QueryWrapper<T>({ query, children, showLoading }: {
    query: UseQueryResult<T, Error>;
    children: (data: T) => React$1.ReactElement | false;
    showLoading?: boolean;
}): React$1.ReactElement;

declare function HeaderFilter({ items }: {
    items: Record<string, {
        data: Array<{
            id: string;
            icon?: string;
            name: string;
            color?: string;
        }> | 'loading' | 'error';
        isColored?: boolean;
    }>;
}): React$1.ReactElement;

declare function ConfigColumn({ title, desc, icon, vertical, tooltip, hasDivider, children, wrapWhen, noDefaultBreakpoints, className, }: {
    title: string | React$1.ReactNode;
    desc: string;
    icon: string;
    vertical?: boolean;
    tooltip?: React$1.ReactNode;
    hasDivider?: boolean;
    children: React$1.ReactNode;
    wrapWhen?: "sm" | "md" | "lg" | "xl";
    noDefaultBreakpoints?: boolean;
    className?: string;
}): React$1.ReactElement;

declare function Pagination({ currentPage, onPageChange, totalPages, className, }: {
    totalPages: number;
    onPageChange: (page: number) => void;
    currentPage: number;
    className?: string;
}): React$1.ReactElement;

declare function Scrollbar({ children, ...props }: {
    children: React$1.ReactNode;
} & ScrollbarProps): React$1.ReactElement;

declare function Tabs<T extends string>({ items, enabled, active, onNavClick, className }: {
    items: Array<{
        id: T;
        name: string;
        icon: string;
        amount?: number;
    }>;
    enabled: T[];
    active: T;
    onNavClick: (id: T) => void;
    className?: string;
}): React$1.ReactElement;

declare function ViewModeSelector<T extends string>({ viewMode, setViewMode, options, className }: {
    viewMode: T;
    setViewMode: (value: T) => void;
    options: Array<{
        value: T;
        icon: string;
    }>;
    className?: string;
}): React$1.ReactElement;

declare function DashboardItem({ ref, className, icon, title, children, componentBesideTitle, namespace, }: {
    ref?: React$1.Ref<any>;
    className?: string;
    icon: string;
    title: string;
    children?: React$1.ReactNode;
    componentBesideTitle?: React$1.ReactNode;
    namespace?: string;
}): React$1.ReactElement;

interface IThemeData {
    apiHost: string;
    googleAPIKey: string;
    theme: "light" | "dark" | "system";
    themeColor: string;
    bgTemp: string;
    bgImage: string;
    setTheme: (theme: "light" | "dark" | "system") => void;
    setThemeColor: (color: string) => void;
    setBgTemp: (color: string) => void;
    setBgImage: (image: string) => void;
    language: string;
}
interface LifeforgeUIProviderProps {
    children: ReactNode;
    personalization?: IThemeData;
}
declare const LifeforgeUIProvider: React$1.FC<LifeforgeUIProviderProps>;
declare const useLifeforgeUIContext: () => IThemeData;

export { APIFallbackComponent, _default$2 as Button, Checkbox, ColorInput, ColorPickerModal, ConfigColumn, CreateOrModifyButton, CreatePasswordScreen, CurrencyInputComponent as CurrencyInput, DashboardItem, DateInput, DeleteConfirmationModal, DnDContainer, EmptyStateScreen, ErrorScreen, FAB, FormModal, GoBackButton, HamburgerMenu, HamburgerSelectorWrapper as HamburgerMenuSelectorWrapper, HeaderFilter, IconInput, IconPickerModal, ImageAndFileInput, ImagePickerModal, _default as InputIcon, InputLabel, InputWrapper, LifeforgeUIProvider, ListboxNullOption, ListboxOrComboboxInput, ListboxOrComboboxOption, ListboxOrComboboxOptions, LoadingScreen, LocationInput, LockedScreen, MenuItem, MissingAPIKeyScreen, ModalHeader, ModalWrapper, NotFoundScreen, OTPScreen, Pagination, PreviewContainer, QRCodeScanner, QueryWrapper, Scrollbar, SearchInput, SidebarDivider, SidebarItem, SidebarTitle, SidebarWrapper, Switch, Tabs, TagsInput, _default$1 as TextInput, ViewModeSelector, useLifeforgeUIContext };
