type HourLineProps = {
  actualHour: { display: string | undefined };
};

const HourLine: React.FC<HourLineProps> = ({ actualHour }) => {
  return (
    <div>
      <div className="bg-red-600 h-1"></div>
      <div className="text-left text-red-600 text-[8px]">
        {actualHour ? actualHour.display : ''}
      </div>
    </div>
  );
};

export default HourLine;
