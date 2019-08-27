import * as React from 'react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '400px',
  },
  name: {
    width: '60px',
    fontWeight: 'bold',
    overflowWrap: 'break-word',
  },
  message: {
    flex: 1,
    overflowWrap: 'break-word',
  }
});

interface ChatItemProps {
  name: string;
  message: string;
}

export const ChatItem: React.FC<ChatItemProps> =
    ({ name, message }) => (
        <div className={css(styles.container)}>
            <div className={css(styles.name)}>{name}</div>
            <div className={css(styles.message)}>{message}</div>
        </div>
      );
