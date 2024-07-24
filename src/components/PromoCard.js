export default function CardHome() {
    return (
        <div className="flex gap-2 p-10">
            {list.map((item, index) => (
                <Link href={"./products/" + item.title}>
                    {" "}
                    <Card
                        shadow="sm"
                        key={index}
                        isPressable
                        onPress={() => console.log("item pressed")}
                    >
                        <CardBody className="overflow-visible p-4">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width={1000}
                                height={1000}
                                alt={item.title}
                                className="self-center  w-fit h-64 md:h-80 pb-1 rounded-lg"
                                src={item.img}
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <b>{item.title}</b>
                            <p className="text-default-500">{item.price}</p>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    )

}