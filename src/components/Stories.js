import { stories } from 'src/lib/stories';
import { StoryCard } from './StoryCard';

export const Stories = () => {
  return (
    <div className='flex items-center'>
      {stories.map((story) => (
        <StoryCard key={story.name} story={story} />
      ))}
    </div>
  );
};
