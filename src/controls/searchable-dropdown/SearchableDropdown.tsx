import {
  IBasePickerSuggestionsProps,
  ITag,
  Label,
  TagPicker,
} from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import { FC } from "react";

const testTags: ITag[] = [
  "MT Management L4",
  "AS Industrial L4",
  "CFO BSC Accounts Payable L4",
  "UT Technology and Communications L4",
  "IP WA Infrastructure L4",
  "RS Pavements L4",
  "RS Plant and Assets L4",
  "IP South East Infrastructure L4",
  "SGI MP High Capacity Metro Trains L4",
  "CFO BSC Systems Accounting L4",
  "CFO IT Service Delivery L4",
  "Mining Otraco West L4",
  "Rollingstock Services VIC SA L4",
  "CFO IT Portfolio and Project Management Services L4",
  "UT Power and Gas Distribution Networks L4",
  "RS DM Roads L4",
  "UT Water Services South L4",
  "Mining OCE Goonyella L4",
  "RS Bitumen and Specialist Services L4",
  "UT Water Services North L4",
].map((item) => ({ key: item, name: item }));

export interface ISearchableDropdownControl {
  label: string;
  disabled: boolean;
  required: boolean;
}

export const SearchableDropdownControl: FC<ISearchableDropdownControl> = ({
  label,
  disabled,
  required,
}) => {
  // All pickers extend from BasePicker specifying the item type.
  const pickerId = useId("inline-picker");
  //   const picker = useRef<IBasePicker<ITag>>(null);

  //   const inputProps: IInputProps = {
  //     onBlur: (ev: React.FocusEvent<HTMLInputElement>) =>
  //       console.log("onBlur called"),
  //     onFocus: (ev: React.FocusEvent<HTMLInputElement>) =>
  //       console.log("onFocus called"),
  //   };

  const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
    suggestionsHeaderText: "Suggested tags",
    noResultsFoundText: "No color tags found",
  };

  const listContainsTagList = (tag: ITag, tagList?: ITag[]) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.some((compareTag) => compareTag.key === tag.key);
  };

  const filterSuggestedTags = (
    filterText: string,
    tagList: ITag[] | undefined
  ): ITag[] | PromiseLike<ITag[]> => {
    return filterText
      ? testTags.filter(
          (tag) =>
            tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 &&
            !listContainsTagList(tag, tagList)
        )
      : [];
  };

  //   const filterSelectedTags = (filterText: string, tagList: ITag[]): ITag[] => {
  //     return filterText
  //       ? testTags.filter(
  //           (tag) =>
  //             tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0
  //         )
  //       : [];
  //   };

  const getTextFromItem = (item: ITag) => item.name;
  return (
    <div>
      <Label htmlFor={pickerId} required={required} disabled={disabled}>
        {label}
      </Label>
      <TagPicker
        disabled={disabled}
        removeButtonAriaLabel="Remove"
        selectionAriaLabel="Selected colors"
        onResolveSuggestions={filterSuggestedTags}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        itemLimit={4}
        // disabled={tagPicker}
        inputProps={{
          id: pickerId,
        }}
      />
    </div>
  );
};
