import { stories } from 'src/lib/stories';
import { StoryCard } from './StoryCard';

export const Stories = () => {
  return (
    <div className='flex items-center space-x-3 p-3 mt-5'>
      {stories.map((story) => (
        <StoryCard key={story.name} story={story} />
      ))}
    </div>
  );
};
