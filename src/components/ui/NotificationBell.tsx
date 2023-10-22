interface NotificationBellProps {
    isRed?: boolean;
    count?: number;
    onClick?: () => void;
  }
  
  const NotificationBell: React.FC<NotificationBellProps> = ({ isRed = false, count = 0, onClick }) => {
    return (
      <div onClick={onClick} style={{ position: 'relative', cursor: 'pointer' }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ fill: isRed ? 'red' : 'gray' }}
        >
          <path d="M12 22C13.1046 22 14 21.1046 14 20H10C10 21.1046 10.8954 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64001 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" />
        </svg>
        {count > 0 && (
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            padding: '0.25em',
            borderRadius: '50%',
            background: 'red',
            color: 'white',
            fontSize: '0.75em'
          }}>
            {count}
          </span>
        )}
      </div>
    );
  };
  
  export default NotificationBell;
  