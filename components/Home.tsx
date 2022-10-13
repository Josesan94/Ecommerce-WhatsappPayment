import React from "react";
import { NextPage } from "next";
import { Box, Button, Container, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: React.FC = () => {

  const router = useRouter();

  return (
    <>
      <Container marginY={4} maxWidth="full" padding={4}>
        <Stack justifyContent="center" alignItems="center">
          <h4>Bievenido a Moreira Hnos</h4>
            <Stack justifyContent="space-around">
            <Button>
            <Link href="/products"> 
            <a>
            Dirigirse a radiadores
            </a>
            </Link>
            </Button>
            <Button>
            <Link href="/404"> Dirigirse a paneles</Link>
            </Button>
            </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
