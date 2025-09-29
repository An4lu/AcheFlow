import { styled } from '../../styles';

export const GanttContainer = styled('div', {
  width: '100%',
  height: '65vh',

  '.gantt_task_line': {
    backgroundColor: '$primaryPink',
    border: '1px solid $secondaryPink',
  },
  '.gantt_task_line.gantt_project': {
    backgroundColor: '$secondaryOrange !important',
    border: '1px solid $primaryOrange !important',
  },
  '.gantt_task_progress': {
    backgroundColor: '$primaryOrange',
  },
  '.gantt_grid_scale .gantt_grid_head_cell': {
    backgroundColor: '$background',
    color: '$primaryPink',
    borderRight: '1px solid #ddd !important',
  },
  '.gantt_task_row, .gantt_grid_data .gantt_row': {
    '&:hover': {
      backgroundColor: '#fff8f8'
    }
  },
});