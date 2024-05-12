import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

/**
 * Displays a placeholder preview of your content before the data gets loaded.
 * @returns Skeleton
 */
function SkeletonChat() {
    return (
        <Stack sx={{ display: 'flex' }}>
            <Skeleton width="40%" animation="wave" variant="text" sx={{
                fontSize: '6rem',
                padding: '15px',
                borderRadius: '15px',
                borderBottomRightRadius: '0',
                alignSelf: 'flex-end',
                marginBottom: -6
            }} />
            <Skeleton width="64%" animation="wave" variant="text" sx={{
                fontSize: '7rem',
                padding: '15px',
                borderRadius: '15px',
                borderBottomLeftRadius: '0',
                marginBottom: -6
            }} />
            <Skeleton width="45%" animation="wave" variant="text" sx={{
                fontSize: '6rem',
                padding: '15px',
                borderRadius: '15px',
                borderBottomRightRadius: '0',
                alignSelf: 'flex-end',
                marginBottom: -6
            }} />
            <Skeleton width="74%" animation="wave" variant="text" sx={{
                fontSize: '8rem',
                padding: '15px',
                borderRadius: '15px',
                borderBottomLeftRadius: '0',
                marginBottom: -4
            }} />
        </Stack>
    );
}

export default SkeletonChat;