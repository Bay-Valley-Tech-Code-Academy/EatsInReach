export default function LearnMoreCard({image, title, description, link}) {
    return (
        <div className="flex flex-col items-center w-52 mb-28">
            <div className="w-32 h-32 m-6 bg-slate-900 rounded-full"></div>
            <div className="text-center">
                <h3 className="font-bold mb-2"> {title} </h3>
                <p> {description} </p>
                <p className="mt-10">
                    <a href={link}> Learn More </a>
                </p>
            </div>
        </div>
    );
}