export interface IHadithHoc {
  className?: string
}

const HadithHoc = ({ className }: IHadithHoc) => {
  return <div className={className}></div>
}

export default HadithHoc
