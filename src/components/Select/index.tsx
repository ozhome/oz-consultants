import React, {
  SelectHTMLAttributes,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Select: React.FC<ISelectProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLSelectElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleValue = useCallback(() => {
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <select
        onFocus={handleSelectFocus}
        onBlur={handleSelectBlur}
        defaultValue={defaultValue}
        onChange={handleValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;
