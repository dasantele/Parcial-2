import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import {FormattedMessage} from 'react-intl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import * as d3 from "d3";

function PokemonList(props)  {

    let [pokemons, setPokemons] = useState([]);

    const url = (navigator.language === "es-ES"? "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json"
                : "https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json");

    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("pokemons") === null) {
                setPokemons([])
            } else {
                setPokemons(JSON.parse(localStorage.getItem("pokemons")));
            }
        } else {
            fetch(url).then(res=>res.json()).then(res=>{
                setPokemons(res);
                drawGraph(res);
                localStorage.setItem("pokemons", JSON.stringify(res));
            });
        }
        
   
    }, []);

    async function drawGraph(data){
        const canvas = d3.select("#canvas");
        const width = 700;
        const height = 500;

        const margin = { top:10, left:60, bottom:40, right: 10};
        const iwidth = width - margin.left -margin.right;
        const iheight = height - margin.top - margin.bottom;

        const svg = canvas.append("svg")
        .attr("width", width)
        .attr("height", height);

        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);



        const y = d3.scaleLinear()
            .domain([0, 1500])
            .range([iheight, 0]);

        const x = d3.scaleBand()
            .domain(data.map((d) => d.name))
            .range([0, iwidth])
            .padding(0.1);

        const bars = g.selectAll("rect").data(data);

        bars
        .enter()
        .append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.height))
        .attr("height", (d) => iheight - y(d.height))
        .attr("width", x.bandwidth());

        g.append("g")
            .classed("x--axis", true)
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0, ${iheight})`);  
            
        g.append("g")
            .classed("y--axis", true)
            .call(d3.axisLeft(y));
    }


    return (
    <div>
        <Container>
            
            <Row>
                <Col>
                    <Table striped hover>
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col"><FormattedMessage id="Image"/></th>
                        <th scope="col"><FormattedMessage id="Name"/></th>
                        <th scope="col"><FormattedMessage id="Description"/></th>
                        <th scope="col"><FormattedMessage id="Height"/></th>
                        <th scope="col"><FormattedMessage id="Weight"/></th>
                        <th scope="col"><FormattedMessage id="Type"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemons.map( (e) => 
                            <tr>
                                <th scope="row">{e.id}</th>
                                <td><Image src={e.ThumbnailImage} alt={e.ThumbnailAltTex}></Image></td>
                                <td>{e.name}</td>
                                <td>{e.description}</td>
                                <td>{e.height}</td>
                                <td>{e.weight}</td>
                                <td>{e.type.map((tipo)=>
                                {
                                    if(tipo==="grass"||tipo==="Planta")
                                    {
                                        return <Badge variant="success">{tipo}</Badge>
                                    }
                                    if(tipo==="fire"||tipo==="Fuego")
                                    {
                                        return <Badge variant="danger">{tipo}</Badge>
                                    }
                                    if(tipo==="water"||tipo==="Agua")
                                    {
                                        return <Badge variant="primary">{tipo}</Badge>
                                    }
                                    if(tipo==="flying"||tipo==="Volador")
                                    {
                                        return <Badge variant="info">{tipo}</Badge>
                                    }
                                    else{
                                        return<Badge variant="secondary">{tipo}</Badge>
                                    }
                                }
                                )}</td>
                            </tr>
                        )}
                    </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div id="canvas">
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
    );
}

export default PokemonList;