import React from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { TextInputProps } from 'react-native';
import { TextInput, View } from 'react-native';
import { tv } from 'tailwind-variants';

import colors from './colors';
import { Text } from './text';

const inputTv = tv({
  slots: {
    container: 'mb-2 flex-row items-center',
    label: 'text-[#fff] dark:text-neutral-100 text-lg',
    input:
      'flex-1 mt-0 border-[0.5px] font-jakarta text-base leading-5 font-[500] px-4 py-3 rounded-xl bg-[#1b2840] border-neutral-700',
    iconContainer: 'mr-2',
  },
  variants: {
    focused: {
      true: {
        input: 'border-neutral-400',
      },
    },
    error: {
      true: {
        input: 'border-danger-600',
        label: 'text-danger-600 dark:text-danger-600',
      },
    },
    disabled: {
      true: {
        input: 'bg-neutral-200',
      },
    },
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
});

export interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<TextInput, NInputProps>((props, ref) => {
  const { label, error, testID, icon, ...inputProps } = props;
  const [isFocussed, setIsFocussed] = React.useState(false);
  const onBlur = React.useCallback(() => setIsFocussed(false), []);
  const onFocus = React.useCallback(() => setIsFocussed(true), []);
  const styles = React.useMemo(
    () =>
      inputTv({
        error: Boolean(error),
        focused: isFocussed,
        disabled: Boolean(props.disabled),
      }),
    [error, isFocussed, props.disabled]
  );

  return (
    <View>
      <View className={styles.container()}>
        {icon && <View className={styles.iconContainer()}>{icon}</View>}
        <TextInput
          testID={testID}
          ref={ref}
          placeholderTextColor={colors.neutral[400]}
          className={styles.input()}
          onBlur={onBlur}
          onFocus={onFocus}
          {...inputProps}
        >
          {label && (
            <Text
              testID={testID ? `${testID}-label` : undefined}
              className={styles.label()}
            >
              {label}
            </Text>
          )}
        </TextInput>
      </View>
      {error && (
        <Text
          testID={testID ? `${testID}-error` : undefined}
          className="mb-2 text-sm text-white"
        >
          {error}
        </Text>
      )}
    </View>
  );
});

type TRule = Omit<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;
export type RuleType<T> = { [name in keyof T]?: TRule };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: TRule;
};

interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {}
export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { name, control, rules, label, ...inputProps } = props;
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <View>
      {label && (
        <Text testID={`${props.testID}-label`} className="text-white">
          {label}
        </Text>
      )}
      <Input
        ref={field.ref}
        autoCapitalize="none"
        onChangeText={field.onChange}
        value={field.value as string}
        {...inputProps}
        error={fieldState.error?.message}
      />
    </View>
  );
}
