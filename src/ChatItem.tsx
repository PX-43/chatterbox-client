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
  },
  message: {
    flex: '1',
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
            <div className={css(styles.name)}>{message}</div>
        </div>
      );
